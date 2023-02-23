<template>
  <div class="flex justify-between items-center p-2 mb-2 bg-white rounded-md shadow" @click="infoDevice(device.id)">
    <div>
      <p :class="{'text-green-500 font-medium active': device.Value === 'ON', 'text-red-500 font-medium inactive': device.Value === 'OFF'}">{{ device.Name }}</p>
      <p v-if="device.Type=== 'Sensor'">
        {{ device.Value }} º
      </p>
    </div>
    <div v-if="device.Type === 'Executor'">
      <label :for="`toggle-${device.id}`" class="flex items-center cursor-pointer">
        <div class="relative">
          <input :id="`toggle-${device.id}`" type="checkbox" class="sr-only" :checked="device.Value === 'ON'" @change="updateDevice(device.id)">
          <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" :class="{ active: device.Value === 'ON' }"></div>
        </div>
        <div class="ml-3 font-medium" :class="{'text-green-700 active': device.Value === 'ON', 'text-red-700 inactive': device.Value === 'OFF'}">
  {{ device.Value }}
</div>
      </label>
    </div>
    <div>
      <button class="delete-button" @click="deleteDevice" :class="{ 'bg-red-500': device.Value === 'OFF', 'bg-green-500': device.Value === 'ON' }">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { actualizaFieldDoc } from "@/API/firebase";

const emits = defineEmits(['deviceDeleted']);

const props = defineProps({
  device: Object,
  createDevice: Boolean
});

const data = reactive({
  isActive: props.device.Value === 'ON'
});

const updateDevice = async (deviceId) => {
  const valueToUpdate = props.device.Value === 'ON' ? 'OFF' : 'ON';
  await actualizaFieldDoc("Devices", deviceId, { Value: valueToUpdate });
  data.isActive = valueToUpdate === 'ON';
};

const deleteDevice = () => {
  emits('deviceDeleted', props.device.id);
};

const infoDevice = (id) => window.open(`http://localhost:5176/${id}`, '_blank')
</script>

<style scoped>
#toggle:checked + .block {
  background-color: #48bb78;
}
#toggle:checked + .block + .dot {
  transform: translateX(1.375rem);
  background-color: #48bb78;
}
.dot {
  transition: transform 0.2s;
  background-color: #f56565;
  border: 2px solid #ccc;
}
.delete-button {
  border: none;
  background-color: #f56565;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.delete-button svg {
  width: 20px;
  height: 20px;
  fill: white;
}

.dot.active {
  background-color: #38a169;
  transform: translateX(2.5rem);
}

.active{
  color:green;
}

.inactive{
  color:red;
}
</style>
