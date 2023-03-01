<template>
  <div v-if="deviceValue" class="device-container bg-white shadow-md rounded-lg">
    <div class="device-header text-xl font-bold">{{ deviceValue.Name }}</div>
    <div class="device-body flex justify-between items-center">
      <div class="device-info flex flex-col">
        <div class="device-type text-lg font-bold">{{ deviceValue.Type }}</div>
        <div class="device-room text-gray-500">{{ deviceValue.Room }}</div>
      </div>
      <div class="device-value flex items-center">
        <template v-if="deviceValue.Type === 'Sensor'">
          <input type="number" v-model="value" @change="updateDevice" 
            class="rounded-full border border-gray-400 py-1 px-3 text-sm mr-3 w-28 focus:outline-none focus:border-blue-500">
        </template>
        <template v-else-if="deviceValue.Type === 'Executor'">
          <div class="device-executor flex items-center">
            <label class="switch">
              <input type="checkbox" v-model="value" @change="updateDevice" 
                class="hidden">
              <span class="slider" :class="{ active: value }">
                <i :class="{ 'far fa-lightbulb': value, 'fas fa-power-off': !value }"></i>
              </span>
            </label>
           </div>
        </template>
        <template v-else>
          <div class="font-bold">{{ deviceValue.Value }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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

watch(deviceValue, (newValue) => {
  if (newValue.Type === "Executor") {
    value.value = newValue.Value === "ON";
  }
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
  width: 400px;
  padding: 1.5rem;
  background-color: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
}

.device-header {
  margin-bottom: 1.5rem;
  color: #4B5563;
}

.device-type {
  margin-bottom: 0.5rem;
  color: #6B7280;
}

.device-value input[type="number"]::-webkit-inner-spin-button,
.device-value input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
  background-color: #D1D5DB;
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
  background-color: #FFFFFF;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #10B981;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.device-info,
.device-executor {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.device-room {
  color: #9CA3AF;
}

.device-value {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Nueva regla para el estado ON */
input:checked + .slider:before:after {
  content: 'ON';
  position: absolute;
  font-size: 10px;
  color: white;
  top: 2px;
  left: 27px;
  text-transform: uppercase;
}
</style>
