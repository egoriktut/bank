<template>
  <div class="search-input">
    <VBtn label="+ Добавить точку партнера" @click="showModalAdd" style="width: 15%; margin-left: 10px;"/>
    <VInput placeholder="Поиск" style="width: 17.7%;" v-model="searchInput"/>
  </div>
  <VTabel v-bind="tableData" @sort="sortTable" @delete="delRow" @edit="editRow"/>
  <VModal v-if="showModaladd">
    <template v-slot:header>
    <img :src="'./remove_selected.svg'" @click="showModalAdd">
    </template>
    <template v-slot:body >
      <form @submit.prevent="addPoint">
        <div class="base-container">
          <VLabel label="Адрес"  />
          <VInput placeholder="Адрес" :required="true" v-model="currentAddress"/>
        </div>
        <div class="base-container">
          <VLabel label="Доставлено" :required="true"/>
          <select v-model="currentDelivered" style="  width: 100%;
            border: none;
            padding: 8px;
            font-size: 16px;
            background-color: #e2e6e7;
            border-radius: 4px;
            outline: none;"
          >
            <option v-for="grade in ['Да', 'Нет']" :value="grade" :key="grade" >{{ grade }}</option>
          </select>
        </div>
        <div class="base-container">
          <VLabel label="Последняя выдача (дней)"/>
          <VInput placeholder="Последняя выдача (дней)" v-model="currentdaysAfterLastCard" :required="true"/>
        </div>
        <div class="base-container">
          <VLabel label="Кол-во заявок"/>
          <VInput placeholder="Кол-во заявок" v-model="currentApprovedRequest" :required="true"/>
        </div>
        <div class="base-container">
          <VLabel label="Кол-во карт"/>
          <VInput placeholder="Кол-во карт" v-model="currentDeliveredCardsNumber" :required="true"/>
        </div>
        <VBtn label="Сохранить" ></VBtn>
      </form>
    </template>
  </VModal>
  <VModal v-if="showModalEdit">
    <template v-slot:header>
    <img :src="'./remove_selected.svg'" @click="showModalEdit = false">
    </template>
    <template v-slot:body >
      <form @submit.prevent="savePoint">
        <div class="base-container">
          <VLabel label="Адрес"  />
          <VInput placeholder="Адрес" :required="true" v-model="currentAddress"/>
        </div>
        <div class="base-container">
          <VLabel label="Доставлено" :required="true"/>
          <select v-model="currentDelivered" style="  width: 100%;
            border: none;
            padding: 8px;
            font-size: 16px;
            background-color: #e2e6e7;
            border-radius: 4px;
            outline: none;"
          >
            <option v-for="grade in ['Да', 'Нет']" :value="grade" :key="grade" >{{ grade }}</option>
          </select>
        </div>
        <div class="base-container">
          <VLabel label="Последняя выдача (дней)"/>
          <VInput placeholder="Последняя выдача (дней)" v-model="currentdaysAfterLastCard" :required="true"/>
        </div>
        <div class="base-container">
          <VLabel label="Кол-во заявок"/>
          <VInput placeholder="Кол-во заявок" v-model="currentApprovedRequest" :required="true"/>
        </div>
        <div class="base-container">
          <VLabel label="Кол-во карт"/>
          <VInput placeholder="Кол-во карт" v-model="currentDeliveredCardsNumber" :required="true"/>
        </div>
        <VBtn label="Сохранить" ></VBtn>
      </form>
    </template>
  </VModal>
</template>
  
<script setup>
import VTabel from '../base/VTabel.vue';
import VInput from '../base/VInput.vue';
import { ref, watch } from 'vue';
import axios from 'axios';
import VBtn from '../base/VBtn.vue';
import VModal from '../base/VModal.vue'
import VLabel from '../base/VLabel.vue';

const urlApi = 'http://185.171.194.122:8088'  

const showModaladd = ref(false)
const showModalEdit = ref(false)

const currentAddress = ref('')
const currentDelivered = ref('Нет')
const currentdaysAfterLastCard = ref('')
const currentApprovedRequest = ref('')
const currentDeliveredCardsNumber = ref('')
const currentId = ref('')


const showModalAdd = () => {
  showModaladd.value = !showModaladd.value
  currentAddress.value = ''
  currentDelivered.value = 'Нет'
  currentdaysAfterLastCard.value = ''
  currentApprovedRequest.value = ''
  currentDeliveredCardsNumber.value = ''
  currentId.value = ''
}

async function addPoint(){
  console.log('adding')
  await axios({
    method: 'post',
    url: `${urlApi}/manage/point`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {
        "address": currentAddress.value,
        "cardsAndMaterialsDelivered": currentDelivered.value === 'Да' ? true : false,
        "daysAfterLastCard": currentdaysAfterLastCard.value,
        "approvedRequest": currentApprovedRequest.value,
        "deliveredCardsNumber": currentDeliveredCardsNumber.value,
    }
  }).then((response) => {
    console.log(response)
    alert(`Партнерская точка ${currentAddress.value} добавлена`)
    showModalAdd()
    location.reload()
  }).catch((error) => {
    console.log(error)
    alert('Ошибка добавления')
  });
}

const delRow = (row) => {
  console.log('del')
  console.log(row)
  axios({
    method: 'delete',
    url: `${urlApi}/manage/point/${row['id']}`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {}
  }).then((response) => {
    console.log(response)
    alert(`Удалена партнерская точка ${row['id']}`)
  }).catch((error) => {
    console.log(error)
    alert('Ошибка удаления')
  });
  location.reload()
}

const editRow = (row) => {
  console.log('edit')
  console.log(row)
  currentAddress.value = row['address']
  currentDelivered.value = row['cardsAndMaterialsDelivered']
  currentdaysAfterLastCard.value = row['daysAfterLastCard']
  currentApprovedRequest.value = row['approvedRequest']
  currentDeliveredCardsNumber.value = row['deliveredCardsNumber']
  currentId.value = row['id']
  showModalEdit.value = true
}

async function savePoint(){
  console.log('saving')
  let pointEditNow = {}
  data.value.forEach((point) => {
    if (point.id === currentId.value){
      console.log(point)
      pointEditNow = point
    }
  })
  pointEditNow.cardsAndMaterialsDelivered = currentDelivered.value === 'Да' ? true : false
  pointEditNow.address = currentAddress.value
  pointEditNow.daysAfterLastCard = currentdaysAfterLastCard.value
  pointEditNow.approvedRequest = currentApprovedRequest.value
  pointEditNow.deliveredCardsNumber = currentDeliveredCardsNumber.value
  await axios({
    method: 'put',
    url: `${urlApi}/manage/point`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: pointEditNow
  }).then((response) => {
    console.log(response)
    alert(`Партнерская точка ${currentId.value} отредактирована`)
    if (pointEditNow.cardsAndMaterialsDelivered){
      pointEditNow.cardsAndMaterialsDelivered  = 'Да'
    } else {
      pointEditNow.cardsAndMaterialsDelivered  = 'Нет'
    }
    currentAddress.value = ''
    currentDelivered.value = ''
    currentdaysAfterLastCard.value = ''
    currentApprovedRequest.value = ''
    currentDeliveredCardsNumber.value = ''
    showModalEdit.value = false
  }).catch((error) => {
    console.log(error)
    alert('Ошибка редактирования')
  });
}
  
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
  {
    label: '',
    key: 'edit',
  },
  {
    label: '',
    key: 'del',
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
  justify-content: space-between;
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
  