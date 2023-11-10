<template>
  <div class="search-input">
    <VInput placeholder="Поиск" style="width: 17.7%;" v-model="searchInput"/>
  </div>
  <VTabel v-bind="tableData" @sort="sortTable" @delete="delRow" @open="openRow"/>
</template>
  
<script setup>
import VTabel from '../base/VTabel.vue';
import VInput from '../base/VInput.vue';
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

// Падает с бэка 
const data = ref([]);

axios({
  method: 'get',
  url: `${urlApi}/manage/get_partner_points`,
  headers: {
    Authorization: localStorage.getItem('authenticated')
  }, 
  data: {}
}).then((response) => {
  console.log(response)
  data.value = response.data
  data.value.forEach((item) => {
    if (item.cardsAndMaterialsDelivered) {
      item.cardsAndMaterialsDelivered = 'Да'
    } else {
      item.cardsAndMaterialsDelivered = 'Нет'
    };
    item.connectionDate = item.connectionDate.slice(0, 10)
  });
}).catch((error) => {
  console.log(error)
});

const headers = [
  {
    label: 'Адрес',
    key: 'address',
    sortDirection: 'asc',
  },
  {
    label: 'Когда подключена',
    key: 'connectionDate',
    sortDirection: 'asc',
  },
  {
    label: 'Доставлено',
    key: 'cardsAndMaterialsDelivered',
    sortDirection: 'asc',
  },
  {
    label: 'Последняя выдача (дней)',
    key: 'daysAfterLastCard',
    sortDirection: 'asc',
  },
  {
    label: 'Кол-во заявок',
    key: 'approvedRequest',
    sortDirection: 'asc',
  },
  {
    label: 'Кол-во карт',
    key: 'deliveredCardsNumber',
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
  