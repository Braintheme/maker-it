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

      initAddNewNote: {
        addingNote: false,
        addingNoteType: null,
        addingNoteStayOnSingle: false
      }
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
    getAddingNewNote: (state) => state.initAddNewNote
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

    INIT_ADD_NEW_NOTE(type) {
      this.initAddNewNote.addingNote = true;
      this.initAddNewNote.addingNoteStayOnSingle = true;
      this.initAddNewNote.addingNoteType = type;
    },

    RESET_ADD_NEW_NOTE(type) {
      this.initAddNewNote.addingNote = false;
      this.initAddNewNote.addingNoteStayOnSingle = (type) ? true : false;
      this.initAddNewNote.addingNoteType = null;
    }
  }
})