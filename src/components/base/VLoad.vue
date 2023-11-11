<template>
    <VLabel :label="`Примерное время выполнения ${props.all ? Math.round((props.all - props.progress) / 60 * 10) / 10 : 0} мин`" />
    <div class="loading-container">
      <div class="loading-bar" :style="{ width: `${props.progress / props.all * 100}%` }"></div>
    </div>
    <VLabel :label="`Выполнено ${props.progress} запросов из ${props.all} `" />
  </template>
  
  <script setup>
  import VLabel from './VLabel.vue';
  const props = defineProps(['progress', 'all']);

  </script>
  
  <style scoped>
  .loading-container {
    width: 100%;
    height: 10px;
    margin: 10px 0;
    background-color: #eee;
    overflow: hidden;
  }
  
  .loading-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.2s ease;
  }
  </style>
  