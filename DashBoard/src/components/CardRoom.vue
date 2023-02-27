<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="bg-gray-900 h-32 w-full flex items-center justify-center">
      <svg
        class="text-white w-8 h-8 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M2 2a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H2zm0 2h16v8H2V4zm0 10v2a2 2 0 002 2h12a2 2 0 002-2v-2H2z"
          clip-rule="evenodd"
        />
      </svg>
      <h2 class="text-white text-2xl">{{ Name }}<v-icon>{{ icons.mdiPencil }}</v-icon></h2>
    </div>
    <div class="p-6">
      <h3 class="text-lg font-semibold mb-2">Description:</h3>
      <p class="text-gray-600 mb-4">{{ Description }}</p>
      <h3 class="text-lg font-semibold mb-2">Devices:</h3>
      <div class="grid grid-cols-1 gap-4">
        <CardDevice v-for="dev in device" :key="dev.id" :device="dev" />
        <button
          @click="createDevice = true"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md"
        >
          <svg
            class="w-5 h-5 fill-current inline-block mr-2"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4 10a1 1 0 01-1 1h-3v3a1 1 0 01-2 0v-3H7a1 1 0 010-2h3V7a1 1 0 012 0v3h3a1 1 0 011 1z"
            />
          </svg>
          <span>Create Device</span>
        </button>
        <div v-if="createDevice">
          <ModalCreateDevice :room="props.Name" :showModal="true" @close-modal="createDevice = false" />

        </div>
      </div>
      <div class="mt-8 flex justify-end">
        <button
          @click="showDeleteModal = true"
          class="bg-white hover:bg-gray-100 text-red-500 font-medium py-2 px-4 border border-red-500 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete Room
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg ml-4"
        >
          Edit Room
        </button>
      </div>
    </div>

    <!-- Delete Modal Rooms + Devices -->
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      v-show="showDeleteModal"
      @click.away="showDeleteModal = false"
    >
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-4">Delete Room</h2>
          <p class="text-gray-600 mb-4">
            Are you sure you want to delete this room and all of its devices?
          </p>
          <div class="flex justify-end">
            <button
              @click="showDeleteModal = false"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              @click="deleteRoomAndDevices"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardDevice from "./CardDevice.vue";
import ModalCreateDevice from "./ModalCreateDevice.vue";
import { borraDoc, borraDocsFiltro } from "@/API/firebase";

const props = defineProps({
  id: String,
  Name: String,
  Description: String,
  device: Object,
});

const showDeleteModal = ref(false);
const createDevice = ref(false);

const deleteRoomAndDevices = async () => {
  borraDoc("Rooms", props.id);
  borraDocsFiltro("Devices", "Room", props.Name);
  showDeleteModal.value = false;
};
</script>
