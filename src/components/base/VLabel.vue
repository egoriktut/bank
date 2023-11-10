<template>
  <label :class="`${props.type}-label${props.active}`" :id="props.id">
    {{ props.label }}
    <slot></slot>
  </label>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "base",
  },
  active: {
    type: String,
    default: "",
  }
});
</script>

<style scoped>
.base-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;    
  font-weight: bold;
  font-size: 14px;
  color: #969191;
  text-align: center;
}

.warning-label {
  font-weight: bold;
  font-size: 14px;
  color: #969191;
  text-align: center;
  background-color: #523e3e; 
  padding: 10px; 
  border: 1px solid #413232; 
  border-radius: 4px; 
}

.user-label {
  display: block;
  margin-bottom: 5px;    
  font-weight: bold;
  font-size: 14px;
  color: #523e3e;
  text-align: center;
  background-color: #969191; 
  border: 1px solid #969191;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
}

.user-label-active {
  display: block;
  margin-bottom: 5px;    
  font-weight: bold;
  font-size: 14px;
  color: #523e3e;
  text-align: center;
  background-color: #ccc;
  border: 1px solid #969191;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
  cursor: pointer;
}
.user-label:hover {
  background-color: #ccc;
  cursor: pointer;
}
</style>
  