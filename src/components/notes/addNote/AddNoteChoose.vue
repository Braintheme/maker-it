<script setup>
import { ref, computed } from 'vue'

import { useNoteSingle } from '@/stores/notes/NoteSingle.js'

import SingleNote from '@/components/notes/single/SingleNote.vue'


const storeNotesAdd = useNoteSingle()

let dialog = ref();

const addNoteTextHandle = () => {
  storeNotesAdd.INIT_ADD_NEW_NOTE('text')
}
const addNoteToDoHandle = () => {
  storeNotesAdd.INIT_ADD_NEW_NOTE('todo')
}

const addMode = computed(() => {
  const addingNote = storeNotesAdd.getAddingNewNote.addingNoteStayOnSingle;
  return addingNote;
})
</script>


<template>
  <v-layout style="height: 60px; width: 300px;">
    <v-bottom-navigation elevation="10">
      <!-- Add note  -->
      <v-dialog v-model="dialog" width="300">
        <template v-slot:activator="{ props }">
          <v-btn variant="tonal" v-bind="props">
            <v-icon>mdi-note</v-icon>
            Add Note
          </v-btn>
        </template>
        <v-card>
          <v-toolbar>
            <!-- <v-btn icon dark @click="dialog = false"><v-icon>mdi-arrow-left</v-icon></v-btn> -->
            <v-toolbar-title>Add Note</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container class="g-10 flex">
            <v-col cols="12">
              <v-btn @click="addNoteTextHandle()" block variant="tonal"><v-icon>mdi-note</v-icon>Text</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn @click="addNoteToDoHandle()" block variant="tonal"><v-icon>mdi-text</v-icon>ToDo</v-btn>
            </v-col>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- Add note  -->
    </v-bottom-navigation>
  </v-layout>
  <!-- Single note  -->
  <SingleNote v-if="addMode" />
</template>