<template>
  <v-card color="#fffb56">
    <!-- <v-img src="https://picsum.photos/200/200" @load="this.$redrawVueMasonry()"></v-img> -->
    <v-card-title>{{ note.title }}</v-card-title>
    <v-card-subtitle>{{ new Date(note.date) }}</v-card-subtitle>
    <v-card-text>{{ note.content }}</v-card-text>
    <v-card-actions>
      <v-btn @click="deleteNote(note.id)" variant="tonal">x</v-btn>
      <v-btn @click="toggleEditNote(note.id)" variant="tonal">edit</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: "App",
  props: ['note'],
  data() {
    return {};
  },
  mounted() {
    this.reBuild();
  },
  methods: {
    deleteNote(id) {
      deleteDoc(doc(collection(db, 'notes'), id))
      this.reBuild();
    },
    reBuild() {
      this.$redrawVueMasonry(); 
    },
  },
};
</script>