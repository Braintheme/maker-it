<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useCurrentUser } from '@/stores/UserStore'

const store = useCurrentUser();
const router = useRouter();
 
const { getUser: authUser } = storeToRefs(store);

const signInWithGoogle = async () => {
  store.userSignInWithGoogle().then(() => {
    router.push('/')
  }) 
}

const hangleLogout = async () => {
  store.userLogout()
  router.push('/')
};

</script>

<template>
  <v-btn v-if="!authUser" @click="signInWithGoogle" variant="elevated">
    Login
  </v-btn>
  
  <!-- User info  -->
  <v-menu min-width="200px" rounded v-if="authUser">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="large">
          <v-img class="userPhoto" :src="authUser.photoURL"> </v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">

          <v-avatar color="brown" class="mb-2">
            <v-img class="userPhoto" :src="authUser.photoURL"> </v-img>
          </v-avatar>

          <h3>{{ authUser.displayName }}</h3>
          <p class="text-caption mt-1">
            {{ authUser.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn rounded variant="text" @click="hangleLogout">
            <v-icon icon="mdi-export" /> Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
  <!-- User info  -->
</template>

<style scoped>
.userPhoto {
  /* width: 100%;
  height: 100%;
  display: block; */
}
</style>