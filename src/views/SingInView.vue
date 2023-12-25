<script setup>
import { useRouter } from 'vue-router'
import { useCurrentUser } from '@/stores/UserStore'

const store = useCurrentUser();
const router = useRouter();

const signInWithGoogle = () => {
  store.userSignInWithGoogle().then(() => {
    router.push('/notes')
  })
}
</script>

<template>
  <h1>SignIn</h1>
  <v-container>
    <v-btn @click="signInWithGoogle" class="mt-2">Google</v-btn>
  </v-container>
</template>