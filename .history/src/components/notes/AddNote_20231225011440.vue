<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const notesCollectionRef = collection(db, 'notes');

const newNoteTitle = ref();
const newNoteContent = ref();

let dialog = ref();

/* 
Add note
*/
const addNote = () => {
  addDoc(notesCollectionRef, {
    date: new Date(),
    title: newNoteTitle.value,
    content: newNoteContent.value
  })
  newNoteTitle.value = '';
  newNoteContent.value = '';
}
</script>
<!-- <v-form @submit.prevent="addNote">
  <v-text-field v-model="newNoteTitle" :rules="rules" label="Title"></v-text-field>
  <v-textarea v-model="newNoteContent" :rules="rules" label="Content"></v-textarea>
  <v-btn type="submit" block class="mt-2">Add</v-btn>
</v-form> -->

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialog = false">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

  
 
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
}
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>