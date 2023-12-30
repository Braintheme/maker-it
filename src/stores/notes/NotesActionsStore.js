import { defineStore } from "pinia";

import { useCurrentUser } from '@/stores/UserStore'

import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase'

export const useNotesActions = defineStore('NotesActions', {
  state: () => {
    return {
      currentUset: useCurrentUser,
    }
  },
  getters: {
    getUserId: () =>  {
      return useCurrentUser().userId
    },
  },
  actions: {
    UPDATE_NOTE() {

    },
    
    DELETE_NOTE(id) {
      deleteDoc(doc(collection(db, 'notes', this.getUserId, 'userNotes'), id))
    },

    ADD_NOTE(obj) {
      addDoc(collection(db, 'notes', this.getUserId, 'userNotes'), obj)
    }
  }
})