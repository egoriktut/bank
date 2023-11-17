<template>
  <!-- Может потребоваться для маштабирования -->
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
          </slot>
        </div>  
        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>
        <div class="modal-footer" style="margin-top: 20px;">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 300px;
  padding: 20px 30px;
  background-color: #fff; 
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  cursor: pointer;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  background-color: #42b983; 
  color: #fff; 
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
