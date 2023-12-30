<script setup>
import { ref } from 'vue'
import { useNotesActions } from '@/stores/notes/NotesActionsStore'

const storeNotes = useNotesActions()

const newNoteTitle = ref();
const newNoteContent = ref();

let dialog = ref();

/* 
Add note
*/
const addNote = () => {

  storeNotes.ADD_NOTE({
    created_date: Date.now(),
    color_index: 0,
    encrypted: 0,
    revision: 0,
    tags: '',
    archived: false,
    done: false,
    modified_date: null,
    title: newNoteTitle.value,
    content: newNoteContent.value
  })
  newNoteTitle.value = '';
  newNoteContent.value = '';
  dialog.value = false;
}
</script>




<template>
  <v-layout class="overflow-visible" style="height: 60px;">
    <v-bottom-navigation bg-color="teal" elevation="10">
      <!-- Add note  -->
      <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <template v-slot:activator="{ props }">
          <v-btn variant="tonal" v-bind="props">
            <v-icon>mdi-note</v-icon>
            Add Note
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-toolbar-title>Note: {{ newNoteTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container>
            <v-form @submit.prevent="addNote">
              <v-text-field v-model="newNoteTitle" label="Title"></v-text-field>
              <v-textarea v-model="newNoteContent" label="Content"></v-textarea>
              <v-btn type="submit" block class="mt-2">Add</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- Add note  -->
    </v-bottom-navigation>
  </v-layout>
</template>