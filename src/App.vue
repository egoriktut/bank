<template>
  <div class="center-content-login" v-if="login">
    <Login @onSubmitForm="sendLogin" :info="errorShow" />
  </div>

  <div v-else>
    <MainPage :user="user" @logout="sendLogout" />
  </div>
  <router-view></router-view>
</template>

<script setup>
import Login from './components/LoginForm.vue'
import MainPage from './components/MainPage.vue'
import { ref, onBeforeMount } from 'vue'
import axios from 'axios';

const login = ref(true)
const errorShow = ref(false)
const user = ref('')
const urlApi = 'http://185.171.194.122:8088'

onBeforeMount(() => {
  const authenticated = localStorage.getItem('authenticated')
  const role = localStorage.getItem('role')
  if (authenticated) {
    login.value = false
  }
  if (role === 'WORKER') {
    user.value = 'WORKER'
  }
  if (role === 'MANAGER') {
    user.value = 'MANAGER'
  }
  localStorage.setItem('role', role)
})

async function sendLogin(onUsername, onPassword) {
  await axios({
    method: 'post',
    url: `${urlApi}/auth/login`,
    headers: {}, 
    data: {
      'login': onUsername,
      'password': onPassword,
    }
  }).then((response) => {
    console.log(response)
    login.value = false
    localStorage.setItem('authenticated', response.data.token)
    localStorage.setItem('role', response.data.user.role)
    localStorage.setItem('name', response.data.user.name)
    user.value = response.data.user.role
  }).catch(() => {
    errorShow.value = true
  });
}

const sendLogout = () => {
  login.value = true
  errorShow.value = false
  localStorage.setItem('authenticated', '')
  localStorage.setItem('Data', '')
  localStorage.setItem('time', '')
  localStorage.setItem('role', '')
  localStorage.setItem('map', '')
}
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}

.center-content-login {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  margin-top: 100px;
  border-radius: 20px;
}

.center-content-user {
  width: 80%;
  margin: 0 auto;
  padding: 30px;
  margin-top: 20px;
  border-radius: 20px;
}
</style>
