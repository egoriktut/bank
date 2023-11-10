<!-- <VModal v-if="addUser">
    <template v-slot:header>
      <VLabel 
        v-if="infoUser"
        label="Проверьте введенные данные!" 
        type="warning"
      />
    </template>
    <template v-slot:body >
      <VLabel 
      label="Логин"
      />
      <VInput 
        type-button="login"
        placeholder="Введите логин"
        :required="true"
        v-model="userLoginAdd"
      />
      <VLabel 
      label="Пароль"
      />
      <VInput 
        type-button="login"
        placeholder="Введите пароль"
        :required="true"
        v-model="userPassAdd"
      />
      <VLabel 
      label="ФИО"
      />
      <VInput 
        type-button="login"
        placeholder="Введите ФИО"
        :required="true"
        v-model="userNameAdd"
      />
      <VLabel 
      id="label-pass"
      label="Адрес локации"
      />
      <VInput 
        type-button="login"
        placeholder="Введите адрес локации"
        :required="true"
        v-model="userLocationAdd"
      />
      <VLabel 
      label="Грейд"
      />
      <select v-model="workersPosition" class="select-modal-user ">
        <option v-for="position in workersPositions" :value="position" :key="position" class="select">{{ position }}</option>
      </select>
    </template>
    <template v-slot:footer>
      <div class="user-info-header">
        <VLabel label="Закрыть" type="user" @click="addUser = false; userNameAdd = ''; userLocationAdd = ''; infoUser = false" style="cursor: pointer;"/>
        <VLabel label="Добавить" type="user" @click="addUserBase" style="cursor: pointer;"/>
      </div>
    </template>
  </VModal> -->