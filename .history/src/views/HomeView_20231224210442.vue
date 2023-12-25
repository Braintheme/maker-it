<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'notes'))
  console.log(querySnapshot);
})


// console.log(db);
</script>

<template> 
  <div></div>
</template>