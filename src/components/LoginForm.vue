<template>
    <div class="login-error" style="margin-bottom: 20px;">
      <VLabel 
        v-if="props.info"
        label="Проверьте корректность введенных данных!" 
        type="warning"
      />
    </div>
  <form @submit.prevent="submitForm" class="login-form">
    <img src="../assets/logo.png" style="max-width: 300px;">
    <div class="base-container">
      <VLabel 
        id="label-pass"
        label="Логин"
      />
      <VInput 
        id="login-input"
        type-button="login"
        placeholder="Введите логин"
        :required="true"
        v-model="username"
      />
    </div>
    <div class="base-container">
      <VLabel
        id="label-pass" 
        label="Пароль" 
      />
      <VInput 
        id="pass-input"
        type-button="password"
        placeholder="Введите пароль"
        :required="true"
        v-model="password"
      />
    </div>
    <VBtn 
      id="btn-login"
      label="Войти" 
    />
  </form>
</template>

<script setup>
import VBtn from './base/VBtn.vue';
import VLabel from './base/VLabel.vue'
import VInput from './base/VInput.vue';
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
  info: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['onSubmitForm']);

const username = ref('');
const password = ref('');

const submitForm = () => {
  emits('onSubmitForm', username.value, password.value);
};
</script>

<style scoped>
.login-form {
  min-width: 350px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #3f3939;
  border-radius: 4px;
  background-color: #3b3535;
  text-align: center; /* Центрировать содержимое формы по горизонтали */
}
.login-error {
  min-width: 350px;
  margin: 0 auto;
  text-align: center; /* Центрировать содержимое формы по горизонтали */
}

.base-container{
  width: 100%;
  margin-bottom: 10px;
}
</style>
