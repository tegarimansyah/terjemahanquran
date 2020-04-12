<template>
  <div>
    <div v-if="surah != null" class="container">
      <!-- Header -->
      <div>
        <nuxt-link to="/tadarus">
          <span class="block text-sm text-blue-600">Back to home</span>
        </nuxt-link>
        <h1 class="text-2xl font-bold">
          {{ surah_name.id.surah_name }} - {{ surah_name.id.surah_translation }}
        </h1>
        <em class="text-sm block">If you find any mistake, please <a href="https://github.com/tegarimansyah/quran.urusan.id/issues/new/choose" class="text-blue-600">leave a comment</a> or email me: <a href="mailto:imansyahtegar@gmail.com" class="text-blue-600">imansyahtegar [at] gmail [dot] com</a></em>
        <hr class="my-3">
      </div>
      <!-- List of Ayah -->
      <div v-for="currentTopic in topics" :key="`${currentTopic.from}-${currentTopic.to}`">
        <span :class="{ hide: !enable_topic }" class="block font-bold mt-10 topic">{{ currentTopic.topic }}</span>
        <!-- Sub Topic Start -->
        <div v-if="currentTopic.subs != null">
          <div v-for="sub in currentTopic.subs" :key="sub.from" :id="`topic-${sub.from}`">
            <span :class="{ hide: !enable_topic }" class="block font-light mt-5 ml-2 topic">{{ sub.text }}</span>
            <!-- Display Ayah and Translation Start -->
            <div :id="ayah.numberInSurah" :class="{ hide: !enable_arabic && !enable_translation }" v-for="ayah in selectedAyah(sub.from, sub.to)" :key="ayah.numberInSurah">
              <div class="flex mt-1 mb-3 ml-2 p-1 pt-3 grid grid-cols-12 gap-0 sm:gap-1 hover:bg-gray-300">
                <div class="col-span-1 flex items-center">
                  <span class="block">{{ ayah.numberInSurah }}</span>
                </div>
                <div class="col-span-11">
                  <span :class="{ hide: !enable_arabic }" class="arabic font-mequran block mb-2 text-right text-3xl">{{ ayah.arabic }}</span>
                  <span :class="{ hide: !enable_translation }" class="translation block">{{ ayah.text }}</span>
                </div>
              </div>
            </div>
            <!-- Display Ayah and Translation End -->
          </div>
        </div>
        <!-- Sub Topic End -->
        <div v-else>
          <!-- Display Ayah and Translation Start -->
          <div :id="ayah.numberInSurah" :class="{ hide: !enable_arabic && !enable_translation }" v-for="ayah in selectedAyah(currentTopic.from, currentTopic.to)" :key="ayah.numberInSurah">
            <div class="flex mt-1 mb-3 ml-2 p-1 pt-3 grid grid-cols-12 gap-0 sm:gap-1 hover:bg-gray-300">
              <div class="col-span-1 flex items-center">
                <span class="block">{{ ayah.numberInSurah }}</span>
              </div>
              <div class="col-span-11">
                <span :class="{ hide: !enable_arabic }" class="arabic font-mequran block mb-2 text-right text-3xl">{{ ayah.arabic }}</span>
                <span :class="{ hide: !enable_translation }" class="translation block">{{ ayah.text }}</span>
              </div>
            </div>
          </div>
          <!-- Display Ayah and Translation End -->
        </div>
      </div>
    </div>
    <!-- Navbar Bottom for Surah Navigation -->
    <div class="fixed bottom-0 w-full text-gray-700 bg-white border-gray-300 border-t-2 dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div class="px-4 pt-2 pb-2">
          <span class="block text-xs">
            <nuxt-link :to="`/tadarus`" class="underline"> &lt; Kembali</nuxt-link> |
            <span v-on:click="scrollToTop" class="underline"> {{ surah_name.id.surah_name }} - {{ surah_name.id.surah_translation }} </span>
          </span>
          <span class="text-base font-semibold tracking-widest text-gray-900 rounded-lg dark-mode:text-white">
            {{ "topic" }}
          </span>
        </div>
        <div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 gap-4 text-center py-3 ">
          <span class="mr-3">Daftar Isi</span>
          <span class="mr-3"><label><input v-model="enable_arabic" type="checkbox"> Tampilkan Arabic</label></span>
          <span class="mr-3"><label><input v-model="enable_translation" type="checkbox"> Tampilkan Terjemahan</label></span>
          <span class="mr-3"><label><input v-model="enable_topic" type="checkbox"> Tampilkan Topik</label></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
    @apply p-10 pb-32 m-auto;
}
.hide {
    display: none;
}
@font-face {
  font-family: 'MeQuran';
  src: url('//cdn.alquran.cloud/public/fonts/me_quran-webfont.otf');
}
.font-mequran {
    font-family: 'MeQuran';
}
</style>

<script>
import surahList from '@/components/surah.js'

export default {
  head () {
    return {
      title: `${this.surah_name.id.surah_name} | Tadarus`
    }
  },
  data () {
    return {
      surah: null,
      enable_translation: true,
      enable_arabic: true,
      enable_topic: true
    }
  },
  watch: {
    enable_translation (state) {
      localStorage.enable_translation = state
    },
    enable_arabic (state) {
      localStorage.enable_arabic = state
    },
    enable_topic (state) {
      localStorage.enable_topic = state
    }
  },
  created () {
    this.surah_number = this.$route.params.surah
    this.surah = localStorage[`surah_${this.surah_number}`]

    if (!this.surah) {
      this.$router.push(`/tadarus/${this.surah_number}/load_data`)
    } else {
      this.surah = JSON.parse(this.surah)
      this.topics = this.surah.topics
      if (!this.topics) {
        this.$router.push(`/tadarus/${this.surah_number}/load_data`)
      }
      this.surah_name = surahList(this.surah_number)
      if (localStorage.enable_translation === undefined) {
        localStorage.enable_translation = 'true'
        localStorage.enable_topic = 'true'
        localStorage.enable_arabic = 'false'
      }
      this.enable_translation = localStorage.enable_translation === 'true'
      this.enable_arabic = localStorage.enable_arabic === 'true'
    }
  },
  methods: {
    selectedAyah (start, end) {
      return this.surah.ayahs.slice(start - 1, end)
    },
    scrollToTop () {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
}
</script>
