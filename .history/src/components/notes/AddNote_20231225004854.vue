<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase'

const notesCollectionRef = collection(db, 'notes');

const newNoteTitle = ref();
const newNoteContent = ref();

const isActivePopup = ref(false);
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
  isActivePopup.value = false;
}
</script>

<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Add Note"> </v-btn>
    </template>

    <template v-slot:default="{ isActivePopup }">
      <v-card>
        <v-card-title style="display: flex; justify-content: space-between;">
          <span class="text-h5">Add Note</span>
          <v-btn text="X" @click="isActivePopup.value = false"></v-btn>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-form @submit.prevent="addNote">
                <v-text-field v-model="newNoteTitle" :rules="rules" required label="Title"></v-text-field>
                <v-textarea v-model="newNoteContent" :rules="rules" required label="Content"></v-textarea>
                <v-btn type="submit" block class="mt-2">Add</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>