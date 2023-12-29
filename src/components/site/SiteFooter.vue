<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      bg-color="teal"
      mode="brown"
    >
      <v-btn variant="tonal">
        <v-icon>mdi-note</v-icon>
        <span>Add Note</span>
      </v-btn>
      
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({ value: 1 }),

    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
  }
</script>