<template>
  <div>
    <!-- Info Modal -->
    <div :class="{'opacity-0 pointer-events-none': !display_modal, 'opacity-100': display_modal}" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">
              {{ $store.state.summary_topic.surah.name }}
            </p>
            <div @click="hide_modal()" class="modal-close cursor-pointer z-50">
              <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          <!--Body-->
          <p v-for="(topic, index) in $store.state.summary_topic.topics" :key="index">
            Ayat {{ topic.from }}-{{ topic.to }}: {{ titleCase(topic.topic) }}
          </p>

          <!--Footer-->
          <div class="flex justify-end pt-2">
            <nuxt-link :id="index+1" :to="`/tadarus/${$store.state.summary_topic.surah.number}`">
              <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
                Mulai Membaca
              </button>
            </nuxt-link>
            <button @click="hide_modal()" class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
      <div v-for="(surah, index) in surah_list" :key="index+1">
        <nuxt-link :id="index+1" :to="`/tadarus/${index+1}`">
          <div class="mt-1 p-1 pt-3 col-span-1 hover:bg-gray-300">
            <span class="block font-semibold">{{ surah.number }} - {{ surah.name }}</span>
            <span class="block">{{ surah.name_latin }} - {{ surah.name_translation }}</span>
            <span class="block">{{ surah.number_of_ayah }} ayat</span>
          </div>
        </nuxt-link>
        <div
          @click="show_modal(
            {
              name: surah.name_latin,
              number: surah.number
            },
            surah.topic
          )"
        >
          Lihat {{ surah.topic.length }} topik
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Pilih Surah | Tadarus'
    }
  },
  data () {
    return {
      surah_list: {},
      display_modal: false
    }
  },
  mounted () {
    if (localStorage.surah_summary) {
      this.surah_list = JSON.parse(localStorage.surah_summary)
    } else {
      this.$axios.$get(`/surah/summary.json`)
        .then((response) => {
          this.surah_list = response
          localStorage.surah_summary = JSON.stringify(response)
        })
    }
  },
  methods: {
    show_modal (surah, topics) {
      this.$store.commit('summary_topic/set', { surah, topics })
      this.display_modal = true
    },
    hide_modal () {
      this.display_modal = false
    },
    titleCase (string) {
      let sentence = string.toLowerCase().split(' ')
      for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
      }
      sentence = sentence.join(' ')
      return sentence
    }
  }
}
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
