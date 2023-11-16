<template>
  <label :class="`${props.type}-label${props.active}`" :id="props.id">
    {{ props.label }}
    <slot></slot>
  </label>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "base",
  },
  active: {
    type: String,
    default: "",
  }
});
</script>

<style scoped>
.base-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;    
  font-weight: bold;
  font-size: 14px;
  font-family: Roboto;
  color: #000000;
  text-align: center;
}

.warning-label {
  font-weight: bold;
  font-size: 14px;
  color: #f53636;
  text-align: center;
  font-family: Roboto;
  background-color: #cac7c7; 
  padding: 10px; 
  border: 1px solid #d88484; 
  border-radius: 4px; 
}

.user-label {
  display: block;
  margin-bottom: 5px;    
  font-weight: bold;
  font-size: 14px;
  font-family: Roboto;
  color: #ffffff;
  text-align: center;
  /* background-color: rgba(59,130,246,.5);  */
  background-color: rgba(255 75 95); 
  
  /* border: 1px solid #696969; */
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.5s ease;
}

.user-label:hover {
  /* background-color: #bfdce4; */
  /* border-color: #bfdce4; */
  background-color: rgb(182, 52, 67); 
  cursor: pointer;
}

.menu-label {
  display: block;
  margin-bottom: 5px;    
  font-weight: bold;
  font-family: Roboto;
  font-size: 20px;
  color: #fffefe;
  text-align: center;
  padding: 8px;
  transition: border-bottom 0.5s ease;
}

.menu-label-active {
  display: block;
  margin-bottom: 5px;    
  font-weight: bold;
  font-size: 20px;
  font-family: Roboto;
  color: #fffefe;
  text-align: center;
  border-bottom: 1px solid rgba(59,130,246,.5);
  padding: 8px;
  transition: border-bottom 0.5s ease;
  cursor: pointer;
}
.menu-label:hover {
  border-bottom: 1px solid rgba(59,130,246,.5);
  cursor: pointer;
}
</style>
  