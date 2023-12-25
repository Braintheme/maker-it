<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'

onMounted(() => {
  const querySnapshot = getDocs(collection(db, 'notes'))
  console.log(querySnapshot);
})


console.log(db);
</script>

<template> 
  <div></div>
</template>