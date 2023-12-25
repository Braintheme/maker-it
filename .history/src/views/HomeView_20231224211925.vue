<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

const notes = ref([

]);

onMounted(async () => {


  onSnapshot(collection(db, 'notes'), (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach((doc)=> {
      notes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date,
      })
    })
  })
})


// console.log(db);
</script>

<template>
  <div></div>
</template>