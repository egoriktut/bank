<template>
  <div v-if="data" class="user-info">
    <div v-if="data[0]" class="user-info-header">
      <div class="user-info-header">
        <router-link to="/">
          <VLabel @click="logoutUser" label="Выйти" type="user"/>
        </router-link> 
      </div>
    </div>
    <VLabel :label="props.userName" />
    <VLoad :progress="dataNow" :all="data.length"/>
  </div>
  <div v-else-if="props.user === 'MANAGER'" class="user-info">
    <div class="user-info-header">
      <div class="user-info-header">
        <router-link to="/">
          <VLabel @click="logoutUser" label="Выйти" type="user"/>
        </router-link> 
      </div>
      <div class="user-info-header-group">
        <router-link to="/users" >
          <VLabel label="Пользователи"  type="user" @click="page = '/users'" :active="page === '/users' ? '-active': ''"/>
        </router-link>
        <router-link to="/points">
          <VLabel label="Точки партнеров"  type="user" @click="page = '/points'" :active="page === '/points' ? '-active': ''"/>
        </router-link>
        <router-link to="/tasks">
          <VLabel label="Задачи"  type="user" @click="page = '/tasks'" :active="page === '/tasks' ? '-active': ''"/>
        </router-link>
      </div>
    </div>
    <VLabel :label="userName" ></VLabel>
    <Manager :current-page="page" />
    <div style="margin-top: 25px; display: flex; justify-content: space-between;" >
      <VLabel label="Судный день"  type="user" @click="reloadState"/>
      <VLabel label="Следующий день"  type="user" @click="startBroot"/>
    </div>
    
  </div>
  <div v-else-if="props.user === 'WORKER'" class="user-info">
    <div class="user-info-header">
      <div class="user-info-header">
        <router-link to="/">
          <VLabel @click="logoutUser" label="Выйти" type="user"/>
        </router-link> 
      </div>
    </div>
    <VLabel :label="userName" ></VLabel>
    <Worker :current-page="page" />
  </div>
  <div id="map" style="opacity: 0;"></div>
</template>

<script setup>
import Manager from './ManagerArea.vue';
import Worker from './WorkerArae.vue';
import VLabel from './base/VLabel.vue';
import VLoad from './base/VLoad.vue';
import { defineProps, defineEmits, ref } from "vue";
import axios from "axios"

const urlApi = 'http://185.171.194.122:8088'

const location = window.location.pathname
const page = ref(location);
const userName = localStorage.getItem('name')

if (page.value === '/') {
  page.value = '/users'
}

const emits = defineEmits(['logout']);

async function reloadState() {
  await axios({
    method: 'put',
    url: `${urlApi}/manage/doomsday`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {}
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  });
  window.location.reload()
};

async function startBroot() {
  const data = ref([])
  await axios({
    method: 'get',
    url: `${urlApi}/maps/get_addresses_for_ya_api`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {}
  }).then((response) => {
    console.log(response)
    data.value = response.data
  }).catch((error) => {
    console.log(error)
  });
  console.log(data.value)
  if (data.value[0]) {
    const jsonData = JSON.stringify(data.value)
    localStorage.setItem('Data', jsonData);
    localStorage.setItem('firstPoint', data.value[0].from)
    localStorage.setItem('secondPoint', data.value[0].to)
    localStorage.setItem('dataNow', 0)
    localStorage.removeItem('time')
  } else {
    axios({
      method: 'put',
      url: `${urlApi}/manage/go_next_day`,
      headers: {
        Authorization: localStorage.getItem('authenticated')
      }, 
      data: {}
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  }
  window.location.reload();
};

const storedData = localStorage.getItem('Data');
const data = ref();
try{
  data.value = JSON.parse(storedData)
}catch(e){
  console.log('empty')
}
console.log('data')
console.log(data.value)
const dataNow = ref(parseInt(localStorage.getItem('dataNow')));

const showLoad = ref(false)

async function fillCache() {
  await axios({
      method: 'post',
      url: `${urlApi}/maps/fill_maps_cache`,
      headers: {
        Authorization: localStorage.getItem('authenticated')
      }, 
      data: {data: data.value}
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  await axios({
      method: 'put',
      url: `${urlApi}/manage/go_next_day`,
      headers: {
        Authorization: localStorage.getItem('authenticated')
      }, 
      data: {}
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
    localStorage.removeItem('Data');
    window.location.reload();
};



if (data.value){
  console.log(dataNow.value)
  console.log(data.value.length)
  showLoad.value = (
    dataNow.value === data.value.length
  )
  if (showLoad.value){
    fillCache()
  }
}


const logoutUser = () => {
  emits('logout');
};

const props = defineProps({
  user: {
    type: String,
    default: "MANAGER",
  },
});

</script>

<style>
.user-info {
  min-width: 100%;
  min-height: 60%;
  margin: 0 auto;
  padding: 20px;
  border: 5px;
  border-radius: 5px;
  background-color: #3b3535;
}

.user-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin-bottom: 20px;
}

.user-info-header-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.user-info-header-group > *{
  margin-right: 10px;
  min-width: 100px;
}
.active-link {
  background-color: #ccc;
}
</style>