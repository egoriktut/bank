<template>
  <div v-if="props.currentPage === '/users'">
    <UseresPage/>
  </div>
  <div v-if="props.currentPage === '/points'">
    <PartnerPointPage/>
  </div>
  <div v-if="props.currentPage === '/tasks'">
    <TasksPage/>
  </div>
</template>

<script setup>
import PartnerPointPage from './manager/PartnerPointPage.vue';
import UseresPage from './manager/UseresPage.vue';
import TasksPage from './manager/TasksPage.vue';
import { defineProps } from 'vue';


const props = defineProps({
  currentPage: {
    type: String,
    default: "/user",
  },
});

</script>

<style scoped>
</style>
