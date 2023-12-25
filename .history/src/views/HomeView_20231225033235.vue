<script setup>
import CardNote from '@/components/notes/CardNote.vue'
import AddNote from '@/components/notes/AddNote.vue'


import { ref, onMounted, watch } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

const notes = ref([]);

const notesCollectionRef = collection(db, 'notes');

/* 
Get Notes
*/
const getNotes = () => {

  onSnapshot(notesCollectionRef, (querySnapshot) => {
    const fbNotes = [];
    querySnapshot.forEach((doc) => {
      fbNotes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date,
      })
    })
    notes.value = fbNotes.sort((a, b) => a.date + b.date);
  })
}

onMounted(() => {
  getNotes()
})

watch(notes, () => {
  // getNotes()
})

</script>

<template>
  <div style="position: relative; padding-bottom: 70px;">
    <v-container>
      <v-row v-masonry transition-duration="0.6s" transition-delay="0.5s" item-selector=".note">
        <v-col v-masonry-tile class="note" v-for="note in notes" :key="note.id" cols="12" lg="3" sm="6" xl="2" md="4">
          <CardNote :note="note" @noteDeleted="getNotes" />
        </v-col>
      </v-row>
    </v-container>
    <AddNote />
  </div>
</template>