<script setup>
import { useCurrentUser } from '@/stores/UserStore'

import { RouterLink, RouterView , useRouter} from 'vue-router'

const store = useCurrentUser();
const router = useRouter();

store.setUserAuth()

const hangleLogout = () => {
  store.userLogout();
  router.push('/sign-in')
};
</script>
 
<template>
  <nav>
    <router-link to="/sign-in" v-if="!store.getUserLoggedIn">Sign In</router-link>
    <router-link to="/notes">Notes</router-link>
    <router-link @click="hangleLogout" v-if="store.getUserLoggedIn" to="/notes">Logout</router-link>
  </nav>
  <RouterView />
</template>
