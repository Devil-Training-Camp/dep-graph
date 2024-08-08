<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const fullscreenLoading = ref(true)
</script>
