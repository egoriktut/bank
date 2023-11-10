<template>
  <div v-if="props.user === 'MANAGER'" class="user-info">
    <div class="user-info-header">
      <div class="user-info-header">
        <router-link to="/">
          <img src="src/assets/logout.svg" @click="logoutUser" style="cursor: pointer;">
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
    <VLabel :label="props.userName" ></VLabel>
    <Manager :current-page="page" />
  </div>
  <div v-else-if="props.user === 'WORKER'" class="user-info">
    <div class="user-info-header">
      <div class="user-info-header">
        <router-link to="/">
          <img src="src/assets/logout.svg" @click="logoutUser" style="cursor: pointer;">
        </router-link> 
      </div>
    </div>
    <VLabel :label="props.userName" ></VLabel>
    <Worker :current-page="page" />
  </div>
</template>

<script setup>
import Manager from './ManagerArea.vue';
import Worker from './WorkerArae.vue';
import VLabel from './base/VLabel.vue';
import { defineProps, defineEmits, ref } from "vue";

const location = window.location.pathname
const page = ref(location);

if (page.value === '/') {
  page.value = '/users'
}

const emits = defineEmits(['logout']);

const logoutUser = () => {
  emits('logout');
};

const props = defineProps({
  user: {
    type: String,
    default: "MANAGER",
  },
  userName: {
    type: String,
    default: "",
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