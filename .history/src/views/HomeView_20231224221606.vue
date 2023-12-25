<script setup>
import { VBtn } from 'vuetify/components/VBtn'
import { ref, onMounted } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

const notes = ref([]);

onMounted(() => {
  onSnapshot(collection(db, 'notes'), (querySnapshot) => {
    const fbNotes = [];
    querySnapshot.forEach((doc) => {
      fbNotes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().date,
      })
    })
    notes.value = fbNotes;
  })
})



</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="note in notes" :key="note.id">
          <v-card :title="note.title" :subtitle="note.date" :text="note.content">
            <v-card-actions>
              <v-btn color="primary">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>