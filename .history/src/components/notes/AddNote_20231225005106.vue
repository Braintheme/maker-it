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
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Add Note"> </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title style="display: flex; justify-content: space-between;">
          <span class="text-h5">Add Note</span>
          <v-btn @click="isActive.value = false">X</v-btn>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-form @submit.prevent="addNote">
                <v-text-field v-model="newNoteTitle" :rules="rules" label="Title"></v-text-field>
                <v-textarea v-model="newNoteContent" :rules="rules" label="Content"></v-textarea>
                <v-btn type="submit" block class="mt-2">Add</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>