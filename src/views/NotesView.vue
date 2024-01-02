<script>
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase'

import { useCurrentUser } from '@/stores/UserStore'
import { useNotesActions } from '@/stores/notes/NotesActionsStore'
import { useNoteSingle } from '@/stores/notes/NoteSingle'

import CardNote from '@/components/notes/card/CardNote.vue'
import SingleNote from '@/components/notes/single/SingleNote.vue'
import AddNote from '@/components/notes/AddNote.vue'
import AddNoteChoose from '@/components/notes/addNote/AddNoteChoose.vue'

export default {
  name: "NoteView",
  props: ['note'],
  components: {
    CardNote,
    AddNote,
    AddNoteChoose,
    SingleNote
  },
  data() {
    return {
      currentUserId: null,
      store: useCurrentUser(),
      storeNotes: useNotesActions(),
      storeNoteSingle: useNoteSingle(),
      openNoteId: '',
      notes: [],
      openSingle: false
    };
  },
  mounted() {
    this.currentUserId = this.store.getUserId;
    this.getNotes()
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
    singleNoteHandler(id) {
      this.storeNoteSingle.SET_SINGLE_NOTE_ID(id)
      this.storeNoteSingle.SET_SINGLE_NOTE(id)
      this.openNoteId = id;
      this.openSingle = true;
    }
  },
};
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 8s ease-in-out;
}
</style>

<template>
  <div style="position: relative; padding-bottom: 70px;">
    <v-container>

      <v-row v-masonry transition-duration="0.6s" transition-delay="0.5s" item-selector=".note">
        <v-col v-masonry-tile class="note" v-for="note in notes" :key="note.id" cols="6" lg="2" sm="6" xl="1" md="4">
          <CardNote @click="singleNoteHandler(note.id)" :note="note" @noteDeleted="getNotes" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Single note  -->
    <SingleNote v-if="storeNoteSingle.getSingleNoteID && storeNoteSingle.getSingleNote"/>

    <!-- Add Note  -->
    <AddNoteChoose />
    <!-- <AddNote /> -->
  </div>
</template>