<template>
  <div>
    <div v-if="surah != null" class="container">
      <nuxt-link to="/tadarus">
        <span class="block text-sm text-blue-600">Back to home</span>
      </nuxt-link>
      <h1 class="text-2xl font-bold">
        {{ surah_name.id.surah_name }} - {{ surah_name.id.surah_translation }}
      </h1>
      <input v-model="enable_translation" type="checkbox"> Show Translation
      <input v-model="enable_arabic" type="checkbox"> Show Arabic
      <input v-model="enable_topic" type="checkbox"> Show Topic
      <em class="text-sm block">If you find any mistake, please <a href="https://github.com/tegarimansyah/quran.urusan.id/issues/new/choose" class="text-blue-600">leave a comment</a> or email me: <a href="mailto:imansyahtegar@gmail.com" class="text-blue-600">imansyahtegar [at] gmail [dot] com</a></em>
      <hr class="my-3">
      <div v-for="currentTopic in topics" :key="`${currentTopic.from}-${currentTopic.to}`">
        <span :class="{ hide: !enable_topic }" class="block font-bold mt-10 topic">{{ currentTopic.topic }}</span>
        <div :id="ayah.numberInSurah" :class="{ hide: !enable_arabic && !enable_translation }" v-for="ayah in selectedAyah(currentTopic.from, currentTopic.to)" :key="ayah.numberInSurah" class="flex mt-1 mb-3 p-1 pt-3 grid grid-cols-12 gap-0 sm:gap-1 hover:bg-gray-300">
          <div class="col-span-1 flex items-center">
            <span class="block">{{ ayah.numberInSurah }}</span>
          </div>
          <div class="col-span-11">
            <span :class="{ hide: !enable_arabic }" class="arabic font-mequran block mb-2 text-right text-3xl">{{ ayah.arabic }}</span>
            <span :class="{ hide: !enable_translation }" class="translation block">{{ ayah.text }}</span>
          </div>
        </div>
      </div>
    </div>
    <NavbarBottomSurah />
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
import NavbarBottomSurah from '@/components/NavbarBottomSurah'

export default {
  components: {
    NavbarBottomSurah
  },
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
    }
  }
}
</script>
