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
  background-color: #969191;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
  
.base-button:hover {
  background-color: #757373;
}
</style>
  