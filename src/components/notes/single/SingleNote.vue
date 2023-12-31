<script>

import { strippeHTMLTags, trimString } from '@/helpers/stringsHelper'
import { useNoteSingle } from '@/stores/notes/NoteSingle'
import { useNotesActions } from '@/stores/notes/NotesActionsStore'

//Editor
import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default {
  name: "SingleNote",
  components: {
    QuillEditor
  },
  data() {
    return {
      dialog: true,
      editMode: false,

      noteSingleStore: useNoteSingle(),
      noteStore: useNotesActions(),

      editedNote: {},
      openedNote: {},
      // Editor options
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['link'],
            ['blockquote', 'code-block']
          ]
        },
      }
    };
  },
  watch: {
    openedNote(data) {
      if (data && this.isAddNewNote) {
        this.handleEditNote()
      }
    }
  },
  mounted() {
    const noteSingleStore = this.noteSingleStore.getSingleNote;

    this.editedNote = this.noteSingleStore.getSingleNote;
    this.$refs.noteEditor.getQuill().enable(false)

    this.openedNote = {
      title: (noteSingleStore) ? this.noteSingleStore.getSingleNote.title : '',
      content: (noteSingleStore) ? this.noteSingleStore.getSingleNote.content : '',
    }

  },
  computed: {
    getSingleNote() {
      return this.noteSingleStore.getSingleNote
    },

    getSingleNoteID() {
      return this.noteSingleStore.getSingleNoteID
    },

    isAddNewNote() {
      return this.noteSingleStore.getAddingNewNote.addingNote
    }
  },
  methods: {
    noteTitle(title) {
      return trimString(strippeHTMLTags(title), 40) 
    },

    noteTitleHanle() {
      console.log(11);
    },
    closeDialog() {
      this.dialog = false;

      setTimeout(() => {
        this.noteSingleStore.CLEAR_SINGLE_NOTE()
        this.noteSingleStore.RESET_ADD_NEW_NOTE()
      }, 100);
    },

    deleteNote(id) {
      this.noteStore.DELETE_NOTE(id);
      this.noteSingleStore.CLEAR_SINGLE_NOTE()
      this.dialog = false;
      this.reBuildMasonry();
    },

    handleEditNote() {
      this.editMode = true;
      this.$refs.noteEditor.getQuill().enable(true)
      setTimeout(() => {
        this.$refs.noteEditor.focus()
      }, 200);
    },

    async handleAddNewNote() {

     const addedNote =  await this.noteStore.ADD_NOTE({
        created_date: Date.now(),
        color_index: 0,
        encrypted: 0,
        revision: 0,
        tags: '',
        archived: false,
        done: false,
        modified_date: null,
        title: this.openedNote.title,
        content: this.openedNote.content,
        type: this.noteSingleStore.getAddingNewNote.addingNoteType
      })

      this.editMode = false;
      this.$refs.noteEditor.getQuill().enable(false)

      this.noteSingleStore.SET_SINGLE_NOTE(addedNote.id)
      this.noteSingleStore.RESET_ADD_NEW_NOTE(addedNote.id)
    
    },

    async handleUpdateNote() {
      const note = {
        ...this.getSingleNote,
        ...{
          revision: ++this.getSingleNote.revision,
          modified_date: Date.now()
        }
      }
      await this.noteStore.UPDATE_NOTE(note)

      console.log(note);

      this.editMode = false;
      this.$refs.noteEditor.getQuill().enable(false)
    },

    reBuildMasonry() {
      setTimeout(() => { this.$redrawVueMasonry() }, 100);
    },
  },
};

</script>

<style lang="scss">
.v-input {
  &__clearable {
    margin: 0;
    padding: 5px;
  }

  .v-field.v-field--appended {
    padding-right: 0;
  }
}

.ql-editor {
  padding: 0;
}

.editModeEnabled {
  // background-color: yellow;
}
</style>

<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">

    <v-card :class="editMode ? 'editModeEnabled' : ''">

      <v-toolbar dark prominent color="primary">
        <v-btn class="ml-0" icon="mdi-arrow-left" @click="closeDialog()"></v-btn>

        <v-toolbar-title class="ml-0" v-if="!editMode">{{ openedNote.title }}</v-toolbar-title>

        <v-text-field v-else persistent-hint variant="solo" density="compact" v-model="openedNote.title"
          hide-details="auto" @click="noteTitleHanle()" :model-value="noteTitle(openedNote.title)">
        </v-text-field>

        <v-btn v-if="isAddNewNote" @click="handleAddNewNote()" icon>
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <!-- Edit Note  -->
        <v-btn v-if="!editMode" @click="handleEditNote()" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <!-- Save Note  -->
        <v-btn v-else @click="handleUpdateNote()" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>

        <v-toolbar-items>
          <v-menu density="compact" location="bottom">

            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list density="compact">
              <v-list-item class="note-card--list">
                <v-list-item-title>

                  <v-dialog width="200">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" variant="outlined" density="compact" class="ma-2" color="red">
                        <v-icon>mdi-delete</v-icon></v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Confirmation">
                        <v-card-actions>
                          <v-btn @click="deleteNote(getSingleNoteID)" density="compact" color="red">Delete</v-btn>
                          <v-btn text="Close" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>

      </v-toolbar>

      <v-container>

        <quill-editor v-model:content="openedNote.content" ref="noteEditor" theme="bubble" :options="editorOption"
          contentType="html" />

      </v-container>

    </v-card>
  </v-dialog>
</template>
