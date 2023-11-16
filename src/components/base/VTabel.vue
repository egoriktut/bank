<template>
 <div>
    <table class="table">
      <thead>
        <th v-for="header in headers" :key="header.key">
          <span
            v-if="header.sortDirection === 'asc' && header.key !== 'del'"
            @click="sortData(header.key)"
          >
            {{ header.label }}
            <!-- <img :src="'../../../public/sort.svg'" style="transform: rotate(180deg);"> -->
            <img :src="'./sort.svg'" style="transform: rotate(180deg);">

          </span>
          <span
            v-if="header.sortDirection === 'desc' && header.key !== 'del'"
            @click="sortData(header.key)"
          >
            {{ header.label }}
            <!-- <img :src="'../../../public/sort.svg'"> -->
            <img :src="'./sort.svg'">
          </span>
        </th>
      </thead>
      <tbody>
        <tr v-for="item in displayedItems" :key="item.key" :class="item.state ? 'table-cell-ready' : 'table-cell'">
          <td v-for="header in headers" :key="header.key" >
            <div v-if="header.key === 'del'">
              <!-- <img :src="'../../../public/delete.svg'"> -->
              <img :src="'./delete.svg'">
            </div>
            <div v-else @click="openRow(item)">
              {{ item[header.key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-container">
      <div class="page-size-container">
        <VLabel label="Показывать по" />
        <select v-model="itemsPerPage" class="page-size-select">
          <option v-for="size in pageSizes" :value="size" :key="size" class="select">{{ size }}</option>
        </select>
      </div>
      <VLabel :label="`Показано ${displayedItems.length} из ${items.length}`" />
      <div class="pagination-container-btn">
        <div class="pagination">
          <div  
            :class="currentPage === 1 ? 'pagination-button-disabled' : 'pagination-button'"
            @click="prevPage" 
          >Пред.</div>
          <VLabel :label="`${currentPage} старница из ${totalPages}`"/>
          <div
            label="След."   
            :class="currentPage === totalPages ? 'pagination-button-disabled' : 'pagination-button'"
            @click="nextPage" 
          >След.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VLabel from './VLabel.vue';
import { ref, computed, defineEmits } from 'vue';

const emits = defineEmits(['sort', 'delete', 'open'])
const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const currentPage = ref(1);
const pageSizes = [5, 10, 15, 30, 50];
const itemsPerPage = ref(pageSizes[1]);

const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage.value));

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return props.items.slice(startIndex, endIndex);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const sortData = (column) => {
  emits('sort', column);
};

// const del = (row) => {
//   emits('delete', row)
// }

const openRow = (row) => {
  emits('open', row)
}

</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border: 5px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.table th, .table td {
  border: none;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #b7ccd1;
  color: #696969;
  font-weight: bold;
}

.table-cell {
  background-color: #e2e6e7;
  transition: background-color 0.2s;
}

.table-cell:hover {
  background-color: #a9abac;
  cursor: pointer;
}

.table-cell-ready {
  background-color: #b9dd98;
  transition: background-color 0.2s;
}

.table-cell-ready:hover {
  cursor: pointer;
  background-color: #a8df74;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-container-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pagination {
  display: flex;
  align-items: center;
  padding: auto;
}

.pagination-button {
  display: block;
  margin: 5px;    
  font-weight: bold;
  font-size: 14px;
  color: #696969;
  text-align: center;
  background-color: #e2e6e7; 
  /* border: 1px solid #696969; */
  padding: 8px;
  border-radius: 4px;
  
}

.pagination-button:hover {
  background-color: #bfdce4;
  cursor: pointer;
}

.pagination-button-disabled {
  display: block;
  margin: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #696969;
  text-align: center;
  background-color: #a9abac; 
  /* border: 1px solid #696969; */
  padding: 8px;
  border-radius: 4px;
}

.page-size-container {
  display: flex;
  align-items: center;
}

.page-size-select {
  margin-left: 5px;
  padding: 4px;
  background-color: #e2e6e7;
  border: 5px;
  border-radius: 5px;
}

.select{
  border: 5px;
  border-radius: 5px;
  background-color: #e2e6e7;
}

.sortable {
  cursor: pointer;
}

.sorted-asc:after {
  content: '(top)';
}

.sorted-desc:after {
  content: '(bot)';
}
</style>
