<script setup>
import { RouterView } from 'vue-router'
import { useCurrentUser } from '@/stores/UserStore'
import { onMounted, onBeforeMount } from 'vue'
//Header
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'

const authStore = useCurrentUser();

onBeforeMount(()=> {
  authStore.init()
})

</script>
 
<template>
  <div>
    <SiteHeader />
    <RouterView />
    <!-- <SiteFooter /> -->
  </div>
</template>
