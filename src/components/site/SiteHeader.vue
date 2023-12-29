<script setup>
// import { useCurrentUser } from '@/stores/UserStore';
import SiteAuth from '@/components/site/partials/SiteAuth.vue'
import { RouterLink } from 'vue-router';

// const store = useCurrentUser();
// const router = useRouter();


</script>

<template>
  <v-toolbar prominent>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-btn to="/notes" variant="tonal">
              <v-icon icon="mdi-text" /> Notes
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Logo  -->
    <v-toolbar-title><router-link to="/">Makerit</router-link></v-toolbar-title>

    <!-- Auth form  -->
    <SiteAuth />

  </v-toolbar>
</template>

