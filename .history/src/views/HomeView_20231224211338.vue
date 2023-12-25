<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'notes'))
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  })
})


// console.log(db);
</script>

<template> 
  <div></div>
</template>