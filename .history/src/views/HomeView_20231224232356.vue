<script setup>
// import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
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
    date: new Date(),
    title: newNoteTitle.value,
    content: newNoteContent.value
  })
  this.$redrawVueMasonry()

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
    this.$redrawVueMasonry()
  })




})

</script>

<template>
  <div>
    <v-container>
      <v-row v-masonry>
        <v-col cols="12" lg="4" sm="6" xl="2" md="4" v-for="note in notes" :key="note.id">
          <v-card height="100%">
            <!-- <v-img src="https://picsum.photos/200/200" @load="this.$redrawVueMasonry()"></v-img> -->
            <v-card-title>{{ note.title }}</v-card-title>
            <v-card-subtitle>{{ note.date }}</v-card-subtitle>
            <v-card-text>{{ note.content }}</v-card-text>
            <v-card-actions>
              <v-btn prepend-icon="$vuetify" variant="tonal">
                Button
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>

    <v-container>
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