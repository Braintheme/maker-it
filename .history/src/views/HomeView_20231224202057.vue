<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'


const db = useFirestore()

const todos = useCollection(collection(db, 'todos'))

console.log(todos);
</script>

<template>
  <div></div>
</template>