<script setup>
import { ref } from 'vue'
import { useCurrentUser } from '@/stores/UserStore'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase'

const store = useCurrentUser()

const newNoteTitle = ref();
const newNoteContent = ref();

let dialog = ref();

/* 
Add note
*/
const addNote = () => {
  addDoc(collection(db, 'notes', store.getUserId, 'userNotes'), {
    date: Date.now(),
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
            <v-btn icon dark @click="dialog = false">X</v-btn>
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

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>