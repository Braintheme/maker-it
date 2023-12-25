<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted } from 'vue'
import { collection, onSnapshot,  addDoc } from 'firebase/firestore';
import { db } from '@/firebase'

const notes = ref([]);
const newNoteTitle = ref();
const newNoteContent = ref();

const addNote = () => {
  // const newNote = {
  //   id: '',
  //   date: new Date(),
  //   title: '',
  //   content: ''
  // }

  // notes.value.unshift(newNote) 

  addDoc(collection(db, 'notes'), {
    // id: uuidv4(),
    date: new Date(),
    title: newNoteTitle.value,
    content: newNoteContent.value
  }) 

  newNoteTitle.value = '';
  newNoteContent.value = '';
}

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
              <v-btn prepend-icon="$vuetify" variant="tonal">
                Button
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet class="mx-auto">
            <v-form @submit.prevent="addNote">
              <v-text-field v-model="newNoteTitle" :rules="rules" label="Title"></v-text-field>
              <v-textarea v-model="newNoteContent" :rules="rules" label="Content"></v-textarea>
              <v-btn type="submit" block class="mt-2">Submit</v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>