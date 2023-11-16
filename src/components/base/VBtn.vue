<template>
  <button :class="`${props.typeButton}-button`" :id="props.id">
    {{ props.label }}
  </button>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  typeButton: {
    type: String,
    default: "base",
  },
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  }
});
</script>
  
<style scoped>
.base-button {
  width: 100%;
  padding: 12px;
  background-color: #e2e6e7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.5s ease
}
  
.base-button:hover {
  background-color: #bfdce4;
  transition: ease 0.2s;
}
</style>
  