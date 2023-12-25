<script setup>
import {VBtn} from 'vuetify/components/VBtn'
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
  <div class="container">
    <div class="row">
      <div class="col-4" v-for="note in notes" :key="note.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ note.title }}</h5>
            <p class="card-text">{{ note.content }}</p>
            <a href="#" class="btn btn-primary">Open</a>
            <VBtn color="primary">Hello, world!</VBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>