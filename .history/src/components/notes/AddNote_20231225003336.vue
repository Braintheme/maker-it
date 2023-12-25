<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase'

const notesCollectionRef = collection(db, 'notes');

const newNoteTitle = ref();
const newNoteContent = ref();

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

<template>
  <v-form @submit.prevent="addNote">
    <v-text-field v-model="newNoteTitle" label="Title"></v-text-field>
    <v-textarea v-model="newNoteContent" label="Content"></v-textarea>
    <v-btn type="submit" block class="mt-2">Add</v-btn>
  </v-form>
</template>