<template>
  <VLabel :label="`Задач на сегодня распланировано ${plannedTaskConut}`"></VLabel>
  <div class="search-input">
    <VInput placeholder="Поиск" style="width: 17.7%;" v-model="searchInput"/>
  </div>
  <VTabel v-bind="tableData" @sort="sortTable" @delete="delRow" @open="openRow"/>
</template>
  
<script setup>
import VTabel from '../base/VTabel.vue';
import VInput from '../base/VInput.vue';
import VLabel from '../base/VLabel.vue';
import { ref, watch } from 'vue';
import axios from 'axios';

const urlApi = 'http://185.171.194.122:8088'  

const delRow = (row) => {
  console.log('del')
  console.log(row)
};
  
const openRow = (row) => {
  console.log('open')
  console.log(row)
};
  
const searchInput = ref('');  

const data = ref([]);
const planned = ref([])
const plannedTaskConut = ref(0)

axios({
  method: 'get',
  url: `${urlApi}/manage/planned`,
  headers: {
    Authorization: localStorage.getItem('authenticated')
  }, 
  data: {}
}).then((response) => {
  console.log(response.data)
  planned.value = response.data
    axios({
    method: 'get',
    url: `${urlApi}/manage/get_tasks`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {}
  }).then((response) => {
    console.log(response.data)
    data.value = response.data
    data.value.forEach((item) => {
      planned.value.forEach((plannedTask) => {
        if (plannedTask.id === item.id){
          item.status = 'PLANNED'
          plannedTaskConut.value += 1
        } 
      })
      if (item.status == 'CREATED'){
        item.status = 'NEXT DAY'
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
  }).catch((error) => {
    console.log(error)
  });
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
  const searchQuery = searchInput.value.toLowerCase();
  tableData.value.items = tableData.value.items.filter(item => {
    const itemValues = Object.values(item).map(value => value.toString().toLowerCase());
    return itemValues.some(value => value.includes(searchQuery));
  });
})
</script>
  
<style scoped>
  
.search-input{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
  
.select-modal-user {
  width: 100%;
  border: none;
  padding: 8px;
  font-size: 16px;
  background-color: #969191;
  border-radius: 4px;
  outline: none;
}
</style>
  