<template>
  <div>
    <div class=" px-4 md:px-6 lg:px-8 mx-10 lg:mx-40 my-10">
      <h1 class="text-2xl font-bold">
        Tadarus
      </h1>
      <p>Membaca dan memahami Al Qur'an dengan lebih interaktif.</p>

      <!-- Search Bar -->
      <div class="text-gray-600 mt-2">
        <input
          class="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        >
      </div>
      <hr class="my-3">
      <!-- List of surah -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <nuxt-link :id="index+1" v-for="(surah, index) in surah_list" :key="index+1" :to="`/tadarus/${index+1}`">
          <div class="mt-1 mb-3 p-1 pt-3 col-span-1 hover:bg-gray-300">
            <span class="block font-semibold">{{ index+1 }} - {{ surah.id.surah_name }}</span>
            <span class="block">{{ surah.id.surah_translation }}</span>
            <span class="block">{{ surah.id.total_ayah }} ayahs</span>
          </div>
        </nuxt-link>
      </div>
    </div>
    <NavbarBottom />
  </div>
</template>

<script>
import surahList from '@/components/surah.js'
import topicList from '@/components/topic.js'
import NavbarBottom from '@/components/NavbarBottom'

export default {
  components: {
    NavbarBottom
  },
  head () {
    return {
      title: 'Pilih Surah | Tadarus'
    }
  },
  data () {
    return {
      surah_list: surahList('all'),
      topic_list: topicList('all')
    }
  },
  mounted () {
    if (localStorage.language && localStorage.edition && localStorage.base_url) {
      this.language = localStorage.language
    } else {
      localStorage.language = 'id'
      localStorage.edition = 'id.indonesian'
      localStorage.base_url = 'https://api.alquran.cloud/v1'
    }
  }
}
</script>
