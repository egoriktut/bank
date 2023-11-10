<template>
  <div class="base-input">
    <input
      v-model="value"
      :type="props.typeButton"
      :id="props.id"
      :required="props.required"
      :placeholder="props.placeholder"
      :title="props.required ? 'Пожалуйста, заполните это поле' : ''"
    >
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  typeButton: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  }
});

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  },
});

const emit = defineEmits(['update:modelValue']);

</script>

<style scoped>
.base-input {
  width: 100%;
  color: #969191;
  border: 1px solid #757373;
  border-radius: 4px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input input {
  width: 100%;
  border: none;
  padding: 8px;
  font-size: 16px;
  background-color: #969191;
  border-radius: 4px;
  outline: none;
}

</style>
