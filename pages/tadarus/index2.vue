<template>
  <div>
    <!-- Info Modal -->
    <div :class="{'opacity-0 pointer-events-none': !display_modal, 'opacity-100': display_modal}" class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

      <div class="modal-container bg-white max-h-full mx-auto rounded shadow-lg z-50 overflow-y-auto">
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
          <div class="h-64 max-h-full overflow-y-scroll">
            <div v-for="(topic, index) in $store.state.summary_topic.topics" :key="index" class="mb-2">
              <span>Ayat {{ topic.from }}-{{ topic.to }}: {{ titleCase(topic.topic) }}</span>
              <ul class="list-inside list-disc">
                <li v-for="(subtopic, index2) in topic.subs" :key="index2">
                  {{ subtopic.text }}
                </li>
              </ul>
            </div>
          </div>

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
    <div class=" px-4 md:px-6 lg:px-8 mx-10 lg:mx-40 my-10">
      <h1 class="text-2xl font-bold">
        Tadarus
      </h1>
      <p>Membaca dan memahami Al Qur'an dengan lebih interaktif.</p>

      <!-- Search Bar -->
      <div class="text-gray-600 mt-2">
        <input
          v-model="search_query"
          v-on:input="searchbar"
          class="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          autocomplete="off"
          type="search"
          name="search"
          placeholder="Cari Surat, Arti atau Topik dalam Al Qur'an"
        >
      </div>
      <hr class="my-3">
      <!-- Search Result -->
      <div v-if="search_result !== null">
        <span class="mb-3 block text-2xl">{{ search_result }}</span>

        <div v-if="search_query.length > 2">
          <!-- Based on Name -->
          <div>
            <hr class="mt-2 mb-4 border-blue-400">
            <h2 class="font-semibold">
              {{ query_data.in_name.length }} Nama Surat
            </h2>
            <ul v-if="query_data.in_name.length > 0">
              <nuxt-link v-for="surah in query_data.in_name" :key="surah.number" :to="`/tadarus/${surah.number}`" class="mt-2 hover:text-blue-500">
                <li class="ml-4">
                  <span class="font-semibold">Surah no {{ surah.number }}:</span> {{ surah.name_latin }} - {{ surah.name_translation }}
                </li>
              </nuxt-link>
            </ul>
            <p v-else class="ml-4">
              Tidak ditemukan
            </p>
          </div>
          <!-- Based on Topic -->
          <div>
            <hr class="mt-2 mb-4 border-blue-400">
            <h2 class="font-semibold">
              {{ query_data.in_topic.length }} Topik
            </h2>
            <ul v-if="query_data.in_topic.length > 0">
              <nuxt-link v-for="data in query_data.in_topic" :key="data.surah_name" :to="`/tadarus/${data.surah_number}`" class="mt-2 hover:text-blue-500">
                <li class="ml-4 mb-2">
                  <span class="font-semibold">Dari {{ data.surah_name }} {{ data.topic.from }}-{{ data.topic.to }}</span>: {{ data.topic.topic }}
                  <ul v-if="data.subtopic.length > 0" class="ml-6">
                    <li v-for="subtopic in data.subtopic" :key="`${data.surah_name}-${subtopic.from}`">
                      {{ subtopic.subs.text }}
                    </li>
                  </ul>
                </li>
              </nuxt-link>
            </ul>
            <p v-else class="ml-4">
              Tidak ditemukan
            </p>
          </div>
          <!-- Based on Translation -->
          <div>
            <hr class="mt-2 mb-4 border-blue-400">
            <h2 class="font-semibold">
              Arti
            </h2>
            <ul>
              ( COMING SOON )
            </ul>
          </div>
          <!-- Based on Tafsir -->
          <div>
            <hr class="mt-2 mb-4 border-blue-400">
            <h2 class="font-semibold">
              Tafsir
            </h2>
            <ul>
              ( COMING SOON )
            </ul>
          </div>
        </div>
        <div v-else class="center">
          <p>Ketik minimal 3 huruf</p>
        </div>
        <hr class="mt-5">
      </div>

      <!-- List of surah -->
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
  </div>
</template>

<script>
import Hash from '@/components/hash.js'

export default {
  head () {
    return {
      title: 'Pilih Surah | Tadarus'
    }
  },
  data () {
    return {
      search_query: '',
      query_data: {
        in_name: [],
        in_topic: [],
        in_translation: [],
        in_tafsir: []
      },
      surah_list: {},
      display_modal: false,
      search_result: null
    }
  },
  mounted () {
    if (localStorage.surah_summary && localStorage.summary_hash === Hash.summary) {
      this.surah_list = JSON.parse(localStorage.surah_summary)
    } else {
      this.$axios.$get(`/surah/summary.json`)
        .then((response) => {
          this.surah_list = response.surah
          localStorage.surah_summary = JSON.stringify(response.surah)
          localStorage.summary_hash = response.hash
        })
    }
  },
  methods: {
    searchbar (query) {
      if (this.search_query !== '') {
        this.search_result = `Hasil dari "${this.search_query}"`
        if (this.search_query.length > 2) {
          this.filterName(this.surah_list, this.search_query)
          this.filterTopic(this.surah_list, this.search_query)
        }
      } else {
        this.search_result = null
      }
    },
    // BaseFilter (arr, searchKey) {
    //   return arr.filter(
    //     obj => Object.keys(obj).some(
    //       key => obj[key].includes(searchKey)
    //     )
    //   )
    // },
    filterName (arr, searchKey) {
      this.query_data.in_name = arr.filter(
        obj => obj.name_latin.toLowerCase().includes(searchKey.toLowerCase()) || obj.name_translation.toLowerCase().includes(searchKey.toLowerCase())
      )
    },
    filterTopic (arr, searchKey) {
      this.query_data.in_topic = []
      arr.forEach((surah) => {
        surah.topic.forEach((topic) => {
          const subtopic = this.filterSubTopic(topic.subs, searchKey)
          if (topic.topic.toLowerCase().includes(searchKey.toLowerCase()) || subtopic.length > 0) {
            this.query_data.in_topic.push({ surah_name: surah.name_latin, surah_number: surah.number, topic, subtopic })
          }
        })
      })
    },
    filterSubTopic (arr, searchKey) {
      if (arr === undefined) {
        return []
      }
      const data = []
      arr.forEach((subs) => {
        if (subs.text.toLowerCase().includes(searchKey.toLowerCase())) {
          data.push({ subs })
        }
      })
      return data
    },
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
