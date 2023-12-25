<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

const notes = ref([]);

onMounted( () => {
  onSnapshot(collection(db, 'notes'), (querySnapshot) => {
    const fbNotes = [];
    querySnapshot.forEach((doc) => {
      fbNotes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date,
      })
    })
    notes.value = fbNotes;
  })
})



</script>

<template>
  <div>
    <ul v-for="note in notes" :key="note.id">
      <li>{{ note.title }}</li>
      <li>{{ note.content }}</li>
      <li>{{ note.date }}</li>
      <li>{{ note.id }}</li>
    </ul>
  </div>
</template>