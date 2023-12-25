<script>
import { useCurrentUser } from '@/stores/UserStore'

import CardNote from '@/components/notes/CardNote.vue'
import AddNote from '@/components/notes/AddNote.vue'

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

export default {
  name: "NoteView",
  props: ['note'],
  components: {
    CardNote,
    AddNote
  },
  data() {
    return {
      currentUserId: null,
      store: useCurrentUser(),
      notes: []
    };
  },
  mounted() {
    this.currentUserId = this.store.getUserId;
    this.getNotes()
    this.store.setUserAuth()
  },
  methods: {
    getNotes() {
      onSnapshot(collection(db, 'notes', this.currentUserId, 'userNotes'), (querySnapshot) => {
        const fbNotes = [];
        querySnapshot.forEach((doc) => {
          fbNotes.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date,
          })
        })
        this.reBuildMasonry()
        this.notes = fbNotes.sort((a, b) => a.date - b.date).reverse();
      })
    },
    reBuildMasonry() {
      setTimeout(() => { this.$redrawVueMasonry() }, 100);
    },
  },
};
</script>

<template>
  <div style="position: relative; padding-bottom: 70px;">
    <v-container>
      <v-row v-masonry transition-duration="0.6s" transition-delay="0.5s" item-selector=".note">
        <v-col v-masonry-tile class="note" v-for="note in notes" :key="note.id" cols="12" lg="2" sm="6" xl="1" md="4">
          <CardNote :note="note" @noteDeleted="getNotes" />
        </v-col>
      </v-row>
    </v-container>
    <AddNote />
  </div>
</template>