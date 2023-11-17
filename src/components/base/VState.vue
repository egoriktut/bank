<template>
    <VLabel :label="`Выполненные задачи по приоритетам`" />
    <div class="loading-container-high">
      <div class="bar-container">
        <div v-if="maxProps" class="high-bar" :style="{ height: `${props.high / maxProps * 100}%` }"></div>
        <VLabel :label="`Высокий ${props.high}`" />
      </div>
      <div class="bar-container">
        <div v-if="maxProps" class="medium-bar" :style="{ height: `${props.medium / maxProps * 100}%` }"></div>
        <VLabel :label="`Средний ${props.medium}`" />
      </div>
      <div class="bar-container">
        <div v-if="maxProps" class="low-bar" :style="{ height: `${props.low / maxProps * 100}%` }"></div>
        <VLabel :label="`Низкий ${props.low}`" />
      </div>
    </div>
  </template>
  
  <script setup>
  import VLabel from './VLabel.vue';
  import { ref } from 'vue';

  const props = defineProps(['high', 'medium', 'low']);
  const maxProps = ref(0)

  if (props.high > props.medium){
    maxProps.value = props.high
  } else {
    maxProps.value = props.medium
  }
  if (props.low > maxProps.value){
    maxProps.value = props.low
  }
  </script>
  
  <style scoped>
  .loading-container-high {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    min-height: 200px;
    margin-bottom: 20px;
    /* align-items: flex-end; */
  }

  .bar-container {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  
  .high-bar {
    height: 100%;
    min-width: 80px;
    background-color: rgba(59,130,246,1);
  }
  .medium-bar {
    height: 100%;
    min-width: 80px;
    background-color: rgba(59,130,246,.7);
  }
  .low-bar {
    height: 100%;
    min-width: 80px;
    background-color: rgba(59,130,246,.3);
  }
  </style>
  