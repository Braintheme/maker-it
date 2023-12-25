<template>
  <v-card color="#fffb56">
    <!-- <v-img src="https://picsum.photos/200/200" @load="this.$redrawVueMasonry()"></v-img> -->
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ new Date(date.seconds) }}</v-card-subtitle>
    <v-card-text>{{ content }}</v-card-text>
    <v-card-actions>
      <v-btn @click="deleteNote(id)" variant="tonal">x</v-btn>
      <v-btn @click="toggleEditNote(id)" variant="tonal">edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const emit = defineEmits(['noteDeleted'])

defineProps({
  note: {
    type: Object,
    required: true,
  }
})

/* 
Delete note
*/
const deleteNote = id => {
  deleteDoc(doc(collection(db, 'notes'), id))
  emit('noteDeleted')
}   
</script>