<!-- <script setup>
import { onMounted, ref, computed } from 'vue';

import { useNoteSingle } from '@/stores/notes/NoteSingle'

const noteSingleStore = useNoteSingle();

let dialog = ref(true);

const closeDialog = () => {
  dialog.value = false;
  noteSingleStore.SET_SINGLE_NOTE(null)
}


</script> -->

<script>
import { useNoteSingle } from '@/stores/notes/NoteSingle'
import { useNotesActions } from '@/stores/notes/NotesActionsStore'

export default {
  name: "SingleNote",
  data() {
    return {
      dialog: true,
      noteSingleStore: useNoteSingle(),
      noteStore: useNotesActions(),
      classes: ''
    };
  },

  computed: {
    getSingleNote() {
      return this.noteSingleStore.getSingleNote
    },
    getSingleNoteID() {
      return this.noteSingleStore.getSingleNoteID
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;

      setTimeout(() => {
        this.noteSingleStore.CLEAR_SINGLE_NOTE()
      }, 100);

    },
    deleteNote(id) {
      this.noteStore.DELETE_NOTE(id);
      this.noteSingleStore.CLEAR_SINGLE_NOTE()
      this.dialog = false;
      this.reBuildMasonry();
    },
    reBuildMasonry() {
      setTimeout(() => { this.$redrawVueMasonry() }, 100);
    },
  },
};

</script>

<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>

      <v-toolbar dark prominent color="primary">
        <v-btn icon dark @click="closeDialog()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-toolbar-title>{{ getSingleNote.title }}</v-toolbar-title>
        <v-btn @click="toggleEditNote(note.id)" icon>
          <v-icon>mdi-pencil</v-icon>
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

        {{ getSingleNote.content }}

      </v-container>

    </v-card>
  </v-dialog>
</template>
