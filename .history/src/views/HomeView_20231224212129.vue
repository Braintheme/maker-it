<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

const notes = ref([]);

onMounted(() => {
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
    <div v-for="note in notes ">

    </div>
  </div>
</template>