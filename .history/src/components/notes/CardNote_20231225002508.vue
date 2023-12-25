<template>
  <v-card color="#fffb56">
    <!-- <v-img src="https://picsum.photos/200/200" @load="this.$redrawVueMasonry()"></v-img> -->
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ date }}</v-card-subtitle>
    <v-card-text>{{ content }}</v-card-text>
    <v-card-actions>
      <v-btn @click="deleteNote(note.id)" variant="tonal">x</v-btn>
      <v-btn @click="toggleEditNote(note.id)" variant="tonal">edit</v-btn>
      <!-- prepend-icon="$vuetify" -->
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
})
</script>