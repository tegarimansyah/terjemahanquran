<template>
  <div :class="{'opacity-0 pointer-events-none': !$store.state.modal.display, 'opacity-100': $store.state.modal.display}" class="modal fixed w-screen h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

    <div class="modal-container bg-white lg:w-6/12 w-9/12 max-h-full mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">
            {{ $store.state.modal.header }}
          </p>
          <div @click="hide_modal()" class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
        </div>

        <!--Body-->
        <div class="h-64 max-h-full overflow-y-scroll">
          {{ $store.state.modal.body }}
          <!-- <div v-for="(topic, index) in $store.state.summary_topic.topics" :key="index" class="mb-2">
            <span>Ayat {{ topic.from }}-{{ topic.to }}: {{ titleCase(topic.topic) }}</span>
            <ul class="list-inside list-disc">
              <li v-for="(subtopic, index2) in topic.subs" :key="index2">
                {{ subtopic.text }}
              </li>
            </ul>
          </div> -->
        </div>

        <!--Footer-->
        <div class="flex justify-end pt-2">
          <button @click="hide_modal()" class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    hide_modal () {
      this.$store.commit('modal/close')
    }
  }
}
</script>

<style>

</style>
