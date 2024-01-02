<script>
import { useCurrentUser } from '@/stores/UserStore'
import { useNotesActions } from '@/stores/notes/NotesActionsStore'

export default {
  name: "App",
  props: ['note'],
  data() {
    return {
      store: useCurrentUser(),
      noteStore: useNotesActions(),
    };
  },
  methods: {
    deleteNote(id) {
      this.noteStore.DELETE_NOTE(id)
      this.reBuildMasonry();
    },
    reBuildMasonry() {
      setTimeout(() => { this.$redrawVueMasonry() }, 100);
    },
  },
};
</script>

<style scoped lang="scss">
.card-note--toolbar {
  background: transparent;
  padding: 5px 0;
}

.note-card--list {
  padding: 0;
  padding-inline: 0 !important;
}

.v-card {
  .v-card-text {
    padding: 0 15px 10px 15px;
  }
  
}
.v-list {
    .v-btn {
      min-width: auto;
      margin: 0;
    }
  }
</style>

<template>
  <v-card>

    <v-toolbar density="compact" height="auto" class="card-note--toolbar">

      <v-toolbar-title> {{ note.title }}</v-toolbar-title>
      <v-toolbar-items>
        <v-menu density="compact" location="bottom">

          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" density="compact" variant="plain" v-bind="props"></v-btn>
          </template>

          <v-list density="compact">
            <v-list-item class="note-card--list">
              <v-list-item-title>
                <v-btn @click="toggleEditNote(note.id)" density="compact" class="ma-2" color="purple">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-title>
              <v-list-item-title>

                <v-dialog width="200">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="outlined"  density="compact" class="ma-2" color="red">
                      <v-icon>mdi-delete</v-icon></v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Confirmation">
                      <v-card-actions>
                        <v-btn @click="deleteNote(note.id)" density="compact" color="red">Delete</v-btn>
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
    <!-- <v-card-subtitle>{{ note.date }}</v-card-subtitle> -->
    <v-card-text v-html="note.content"></v-card-text>

  </v-card>
</template>