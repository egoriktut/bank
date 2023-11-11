
<template>
  <div class="search-input">
    <VInput placeholder="Поиск" style="width: 17.7%" v-model="searchInput" />
  </div>
  <VTabel v-bind="tableData" @sort="sortTable" @open="openRow"/>
  <div v-if="showMap">
    <div id="map" style="height: 100%; width: 100%;"></div>
    <VLabel @click="compleateTask" label="Завершить задачу" type="user"/>
  </div>
  
</template>
    
<script setup>
import VTabel from './base/VTabel.vue';
import VLabel from './base/VLabel.vue';
import VInput from './base/VInput.vue';
import start from '../maps/map.js'
import { ref, watch } from 'vue';
import axios from 'axios';

const urlApi = 'http://185.171.194.122:8088' 

const userAddress = ref('')
const searchInput = ref('');  

const data = ref([]);
const showMap = ref(true);

const state = localStorage.getItem('map')

if (!state) {
  localStorage.setItem('map', 'true')
  location.reload()
}


axios({
  method: 'get',
  url: `${urlApi}/job/get_tasks`,
  headers: {
    Authorization: localStorage.getItem('authenticated')
  }, 
  data: {}
}).then((response) => {
  console.log(response.data)
  userAddress.value = response.data.userAddress
  data.value = response.data.tasks
  if (data.value.length === 0) {
    showMap.value = false
  } else {
    if (data.value[0].status === 'COMPLETED'){
      showMap.value = false
    }
    start(userAddress.value, data.value[0].address)
    data.value.forEach((item) => {
      if (item.status === 'IN_PROGRESS') {
        item.status = 'В процессе'
      } else if (item.status === 'CREATED') {
        item.status = 'В ожидании'
      } else {
        item.status = 'Завершено'
      }
      if (item.priority === 'HIGH') {
        item.priority = 'Высокий'
        item.name = 'Выезд на точку для стимулирования выдач'
      } else if (item.priority === 'MEDIUM') {
        item.priority = 'Средний'
        item.name = 'Обучение агента'
      } else {
        item.priority = 'Низкий'
        item.name = 'Доставка карт и материалов'
      }
    });
  }


}).catch((error) => {
  console.log(error)
});

const headers = [
  {
    label: 'ID',
    key: 'id',
    sortDirection: 'asc',
  },
  {
    label: 'Название',
    key: 'name',
    sortDirection: 'asc',
  },
  {
    label: 'Адрес',
    key: 'address',
    sortDirection: 'asc',
  },
  {
    label: 'Приоритет',
    key: 'priority',
    sortDirection: 'asc',
  },
  {
    label: 'Статус',
    key: 'status',
    sortDirection: 'asc',
  },
]


const tableData = ref({
  headers: headers,
  items: data.value
});

const compleateTask = () => {
  axios({
  method: 'put',
  url: `${urlApi}/job/complete_task`,
  headers: {
    Authorization: localStorage.getItem('authenticated')
  }, 
  data: {}
}).then((response) => {
  location.reload()
  console.log(response)
}).catch((error) => {
  console.log(error)
});
};

const sortTable = (column) => {
  tableData.value.headers.forEach((header) => {
    if (header.key == column) {
      const sortDirection = header.sortDirection === 'asc' ? 1 : -1;
      tableData.value.items.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];  
        if (valueA < valueB) {
          return -sortDirection;
        } else if (valueA > valueB) {
          return sortDirection;
        }
        return 0;
      });
      header.sortDirection = header.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      header.sortDirection = 'asc';
    }
  })
};
  
watch([searchInput, data], () => {
  tableData.value.items = data.value
  console.log(data.value)
  console.log(tableData.value.items)
  const searchQuery = searchInput.value.toLowerCase();
  tableData.value.items = tableData.value.items.filter(item => {

    const itemValues = Object.values(item).map(value => value.toString().toLowerCase());
    return itemValues.some(value => value.includes(searchQuery));
  });
})
</script>

<style scoped>
.search-input {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
    