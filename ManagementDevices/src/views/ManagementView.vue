<template>
  <div v-if="deviceValue" class="device-container">
    <div class="device-header">{{ deviceValue.Name }}</div>
    <div class="device-body">
      <div class="device-type">{{ deviceValue.Type }}</div>
      <div class="device-room">{{ deviceValue.Room }}</div>
      <div class="device-value">
        <template v-if="deviceValue.Type === 'Sensor'">
          <input type="number" v-model="value" @change="updateDevice" />
        </template>
        <template v-else-if="deviceValue.Type === 'Executor'">
          <label class="switch">
            <input type="checkbox" v-model="value" @change="updateDevice" />
            <span class="slider round"></span>
          </label>
        </template>
        <template v-else>
          <div>{{ deviceValue.Value }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { giveCollection, actualizaFieldDoc } from "../API/firebase";

const route = useRoute();
const id = route.params.id;
const deviceValue = ref(null);
const value = ref(null);

onMounted(() => {
  giveCollection("Devices", (querySnapshot) => {
    const device = querySnapshot.docs.find((doc) => doc.id === id);
    deviceValue.value = device.data();
    value.value = device.data().Value;
  });
});

const updateDevice = async () => {
  let newValue = value.value;
  if (deviceValue.value.Type === "Executor") {
    newValue = value.value ? "ON" : "OFF";
  }
  const device = {
    Value: newValue,
  };
  await actualizaFieldDoc("Devices", id, device);
};

</script>
<style scoped>
.device-container {
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 400px;
}

.device-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.device-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.device-type {
  font-size: 18px;
  font-weight: bold;
  margin-right: 16px;
}

.device-room {
  font-size: 16px;
  margin-right: 16px;
}

.device-value {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Added styling for executor value */
.device-executor {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 16px;
}

.device-executor span {
  margin-right: 8px;
  font-weight: bold;
}

.device-executor .switch {
  margin-right: 8px;
}

.device-executor .switch input:checked + .slider:before {
  -webkit-transform: translateX(30px);
  -ms-transform: translateX(30px);
  transform: translateX(30px);
}

.device-executor .switch input:checked + .slider {
  background-color: #4CAF50;
}

.device-executor .switch input:focus + .slider {
  box-shadow: 0 0 1px #4CAF50;
}
</style>
