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
    <ul v-for="note in notes" :key="note.id" style="border: 2px solid red;">
      <li> <b>title:</b> {{ note.title }}</li>
      <li><b>content:</b> {{ note.content }}</li>
      <li><b>date:</b> {{ note.date }}</li>
      <li><b>id:</b> {{ note.id }}</li>
    </ul>
  </div>
</template>