<template>
  <v-card color="#fffb56">
    <!-- <v-img src="https://picsum.photos/200/200" @load="this.$redrawVueMasonry()"></v-img> -->
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ new Date(date.seconds) }}</v-card-subtitle>
    <v-card-text>{{ content }}</v-card-text>
    <v-card-actions>
      <v-btn @click="deleteNote(id)" variant="tonal">x</v-btn>
      <v-btn @click="toggleEditNote(id)" variant="tonal">edit</v-btn>
      <!-- prepend-icon="$vuetify" -->
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { collection,doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase'


const notesCollectionRef = collection(db, 'notes');

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  }
})

/* 
Delete note
*/
const deleteNote = id => {
  deleteDoc(doc(notesCollectionRef,id))

  console.log(getCurrentInstance());
}   
</script>