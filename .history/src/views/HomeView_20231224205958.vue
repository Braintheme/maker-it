<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'

onMounted(() => {
  const querySnapshot = getDocs(collection(db, 'notes'))
  querySnapshot.then((data) => {
    console.log(data);
  })
})


console.log(db);
</script>

<template> 
  <div></div>
</template>