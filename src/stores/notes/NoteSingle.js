import { defineStore } from "pinia";
import { useCurrentUser } from '@/stores/UserStore'

import { getDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/firebase'

export const useNoteSingle = defineStore('NoteSingle', {
  state: () => {
    return {
      currentUset: useCurrentUser,
      singleNote: null,
      singleNoteId: null,
    }
  },
  getters: {
    getUserId: () => {
      return useCurrentUser().userId
    },
    getSingleNoteID: (state) => {
      return (isNaN(state.singleNoteId)) ? state.singleNoteId : null;
    },
    getSingleNote: (state) => {
      return state.singleNote;
    },
  },
  actions: {
    CLEAR_SINGLE_NOTE() {
      this.singleNoteId = null;
      this.singleNote = null;
    },
    SET_SINGLE_NOTE_ID(id) {
      this.singleNoteId = id;
    },
    async SET_SINGLE_NOTE(id) {
      const docRef = doc(db, 'notes', this.getUserId, 'userNotes', id);
      const docSnap = await getDoc(docRef);

      this.singleNote = docSnap.data()
    },
  }
})