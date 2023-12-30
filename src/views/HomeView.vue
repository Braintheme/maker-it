<script setup>
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { useCurrentUser } from '@/stores/UserStore'

const store = useCurrentUser();
const { getUserLoggedIn: authUser } = storeToRefs(store);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert color="#2A3B4D" theme="dark" icon="mdi-firework" density="compact">
          List of avalilable components
        </v-alert>
      </v-col>
      <v-col cols="6" lg="4" sm="6" xl="2" md="4">
        <v-card variant="elevated" :disabled="authUser ? false : true">

          <template v-slot:prepend>
            <v-badge color="error" content="9+">
              <v-icon icon="mdi-note"></v-icon>
            </v-badge>
          </template>
          <template v-slot:title>
            Notes
          </template>

          <v-card-text>
            The note app enables easy note creation and organization.
          </v-card-text>
          <v-card-actions>
            <v-btn variant="tonal" to="/notes"> Go to Notes </v-btn>
          </v-card-actions>
          <v-alert v-if="authUser ? false : true" density="compact" type="warning" variant="tonal"
            text="Login for use"></v-alert>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>