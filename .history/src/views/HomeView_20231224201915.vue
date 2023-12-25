<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'


const db = useFirestore()

const users = useCollection(collection(db, 'users'))

console.log(users);
</script>

<template>
  <div></div>
</template>