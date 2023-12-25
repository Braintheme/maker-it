<script setup>
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

const todos = useCollection(collection(db, 'todos'))
console.log(todos);
</script>

<template>
  <div></div>
</template>