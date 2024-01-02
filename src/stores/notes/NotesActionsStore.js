import { defineStore } from "pinia";

import { useCurrentUser } from '@/stores/UserStore'
import { useNoteSingle } from '@/stores/notes/NoteSingle'

import { collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase'

export const useNotesActions = defineStore('NotesActions', {
  state: () => {
    return {
      currentUset: useCurrentUser,
      // editedNoteId: useNoteSingle().getSingleNoteID,
    }
  },
  getters: {
    getUserId: () => {
      return useCurrentUser().userId
    },
    getSingleNoteID: () => {
      return useNoteSingle().getSingleNoteID
    },
  },
  actions: {
    async UPDATE_NOTE(obj) {
      // console.log(useNoteSingle().getSingleNoteID, this.getUserId);
      await updateDoc(doc(db, "notes", this.getUserId, 'userNotes',useNoteSingle().getSingleNoteID), obj);
    },

    async DELETE_NOTE(id) {
      await deleteDoc(doc(collection(db, 'notes', this.getUserId, 'userNotes'), id))
    },

    async ADD_NOTE(obj) {
      return await addDoc(collection(db, 'notes', this.getUserId, 'userNotes'), obj)
    }
  }
})