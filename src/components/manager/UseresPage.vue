<template>
  <div class="search-input">
    <VBtn label="+ Добавить пользователя" @click="showModalAdd" style="width: 15%; margin-left: 10px;"/>
    <VInput placeholder="Поиск" style="width: 17.7%" v-model="searchInput" />
  </div>
  <VTabel v-bind="tableData" @sort="sortTable" @delete="delRow" @open="openRow" @edit="editRow" />
  <VModal v-if="showModaladd">
    <template v-slot:header>
    <img :src="'./remove_selected.svg'" @click="showModalAdd">
    </template>
    <template v-slot:body >
      <form @submit.prevent="addUser">
        <div class="base-container">
          <VLabel label="Логин"/>
          <VInput placeholder="Логин" v-model="currentLogin" :required="true"/>
        </div>
        <div class="base-container">
          <VLabel label="Имя"/>
          <VInput placeholder="Имя" :required="true" v-model="currentName"/>
        </div>
        <div class="base-container">
          <VLabel label="Грейд" :required="true"/>
          <select v-model="currentGrade" style="  width: 100%;
            border: none;
            padding: 8px;
            font-size: 16px;
            background-color: #e2e6e7;
            border-radius: 4px;
            outline: none;"
          >
            <option v-for="grade in AllGrades" :value="grade" :key="grade" >{{ grade }}</option>
          </select>
        </div>
        <div class="base-container">
          <VLabel label="Адрес"/>
          <VInput placeholder="Адрес" v-model="currentAddress" :required="true"/>
        </div>

        <VBtn label="Добавить" ></VBtn>
      </form>
    </template>
  </VModal>
  <VModal v-if="showModalEdit">
    <template v-slot:header>
    <img :src="'./remove_selected.svg'" @click="showModalEdit = false">
    </template>
    <template v-slot:body >
      <form @submit.prevent="saveUser">
        <div class="base-container">
          <VLabel label="Имя"  />
          <VInput placeholder="Имя" :required="true" v-model="currentName"/>
        </div>
        <div class="base-container">
          <VLabel label="Грейд" :required="true"/>
          <select v-model="currentGrade" style="  width: 100%;
            border: none;
            padding: 8px;
            font-size: 16px;
            background-color: #e2e6e7;
            border-radius: 4px;
            outline: none;"
          >
            <option v-for="grade in AllGrades" :value="grade" :key="grade" >{{ grade }}</option>
          </select>
        </div>
        <div class="base-container">
          <VLabel label="Адрес"/>
          <VInput placeholder="Адрес" v-model="currentAddress" :required="true"/>
        </div>

        <VBtn label="Сохранить" ></VBtn>
      </form>
    </template>
  </VModal>
  <VModal v-if="showModalStat">
    <template v-slot:header>
    <img :src="'./remove_selected.svg'" @click="showModalStat = false; currentName = ''">
    </template>
    <template v-slot:body >
      
      <VLabel :label="currentName" />
      <VState :high="highNumber" :medium="mediumNumber" :low="lowNumber"/>
      <VBtn label="Скачать статискику" @click="downloadStat"></VBtn>
    </template>
  </VModal>
</template>

<script setup>
import VTabel from '../base/VTabel.vue'
import VInput from '../base/VInput.vue'
import { ref, watch } from 'vue'
import axios from "axios"
import VBtn from '../base/VBtn.vue';
import VModal from '../base/VModal.vue'
import VLabel from '../base/VLabel.vue';
import VState from '../base/VState.vue';

const urlApi = 'http://185.171.194.122:8088'
const showModaladd = ref(false)
const showModalEdit = ref(false)
const showModalStat = ref(false)

const userDownload = ref()

const AllGrades = ['SENIOR', 'MIDDLE', 'JUNIOR']
const currentGrade = ref('SENIOR')
const currentLogin = ref('')
const currentName = ref('')
const currentAddress = ref('')

const highNumber = ref(0)
const mediumNumber = ref(0)
const lowNumber = ref(0)

const showModalAdd = () => {
  showModaladd.value = !showModaladd.value
  currentLogin.value = ''
  currentName.value = ''
  currentAddress.value = ''
  currentGrade.value = 'SENIOR'
}

const showModaledit = () => {
  showModalEdit.value = !showModalEdit.value
  currentLogin.value = ''
  currentName.value = ''
  currentAddress.value = ''
  currentGrade.value = 'SENIOR'
}

async function addUser(){
  console.log('adding')
  await axios({
    method: 'post',
    url: `${urlApi}/manage/worker`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {
        "login": currentLogin.value,
        "name": currentName.value,
        "grade": currentGrade.value,
        "address": currentAddress.value
    }
  }).then((response) => {
    console.log(response)
    alert(`Пользователь ${currentName.value} добавлен`)
    showModalAdd()
  }).catch((error) => {
    console.log(error)
    alert('Ошибка добавления')
  });
}

async function delRow(row){
  console.log('del')
  await axios({
    method: 'delete',
    url: `${urlApi}/manage/worker/${row['login']}`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {}
  }).then((response) => {
    console.log(response)
    alert(`Пользователь ${row['name']} удален`)
  }).catch((error) => {
    console.log(error)
    alert('Ошибка удаления')
  });
  location.reload()
}

const editRow = (row) => {
  console.log('edit')
  console.log(row)
  console.log(row['name'])
  currentName.value = row['name']
  currentAddress.value = row['address']
  currentGrade.value = row['grade']
  currentLogin.value = row['login']
  showModalEdit.value = true
}

async function saveUser(){
  console.log(data.value)
  let editUserNow = {}
  data.value.forEach((user) => {
    if (user.login === currentLogin.value){
      console.log(user)
      editUserNow = user
    }
  })
  editUserNow.address = currentAddress.value
  editUserNow.grade = currentGrade.value
  editUserNow.name = currentName.value
  await axios({
    method: 'put',
    url: `${urlApi}/manage/worker`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: editUserNow
  }).then((response) => {
    console.log(response)
    alert(`Пользователь ${currentLogin.value} изменен`)
    showModaledit()
  }).catch((error) => {
    console.log(error)
    alert('Ошибка редактирования')
  });
}

const openRow = (row) => {
  console.log(row)
  userDownload.value = row
  currentName.value = row['name']
  allData.value.forEach((item) => {
    if (row['login'] === item.user.login){
      highNumber.value = item.highNumber
      mediumNumber.value = item.mediumNumber
      lowNumber.value = item.lowNumber
    }
  });
  showModalStat.value = true
}

async function downloadStat() {
  console.log(userDownload.value)
  await axios({
    method: 'get',
    url: `${urlApi}/manage/stats/${userDownload.value.login}`,
    headers: {
      Authorization: localStorage.getItem('authenticated')
    }, 
    data: {},
    responseType: 'blob'
  }).then((response) => {
    console.log(response)
    const url = URL.createObjectURL(new Blob([response.data], {
        type: 'application/vnd.ms-excel'
    }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${userDownload.value.login}`)
    document.body.appendChild(link)
    link.click()
  }).catch((error) => {
    console.log(error)
    alert('Ошибка скачивания')
  });
}

const searchInput = ref('')

const data = ref([])
const allData = ref([])
axios({
  method: 'get',
  url: `${urlApi}/manage/get_workers`,
  headers: {
    Authorization: localStorage.getItem('authenticated')
  }, 
  data: {}
}).then((response) => {
  console.log(response.data)
  allData.value = response.data
  allData.value.forEach((item) => {
    try {
      item.user.plannedTasks = item.user.plannedTasks[0].id
    } catch (e) {
      item.user.plannedTasks = 'Нет текущей задачи'
    }
    data.value.push(item.user)
    
  });
}).catch((error) => {
  console.log(error)
});

const headers = [
  {
    label: 'Имя',
    key: 'name',
    sortDirection: 'asc'
  },
  {
    label: 'Грейд',
    key: 'grade',
    sortDirection: 'asc'
  },
  {
    label: 'Адрес',
    key: 'address',
    sortDirection: 'asc'
  },
  {
    label: 'Текущая задача',
    key: 'plannedTasks',
    sortDirection: 'asc'
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
})

const sortTable = (column) => {
  tableData.value.headers.forEach((header) => {
    if (header.key == column) {
      const sortDirection = header.sortDirection === 'asc' ? 1 : -1
      tableData.value.items.sort((a, b) => {
        const valueA = a[column]
        const valueB = b[column]
        if (valueA < valueB) {
          return -sortDirection
        } else if (valueA > valueB) {
          return sortDirection
        }
        return 0
      })
      header.sortDirection = header.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      header.sortDirection = 'asc'
    }
  })
}

watch([searchInput, data], () => {
  console.log(data.value)
  tableData.value.items = data.value
  const searchQuery = searchInput.value.toLowerCase()
  tableData.value.items = tableData.value.items.filter((item) => {
    const itemValues = Object.values(item).map((value) => value.toString().toLowerCase())
    return itemValues.some((value) => value.includes(searchQuery))
  })
})
</script>

<style scoped>
.search-input {
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
