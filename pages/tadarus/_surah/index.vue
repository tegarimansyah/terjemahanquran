<template>
  <div>
    <div v-if="surah_data !== null" class="container lg:p-10">
      <!-- <div id="mark" ref="mark">
        300px above bottom viewport
      </div> -->
      <Modal />
      <!-- Header -->
      <div>
        <nuxt-link to="/tadarus">
          <span class="block text-sm text-blue-600">Kembali ke Beranda</span>
        </nuxt-link>
        <h1 class="text-2xl font-bold">
          {{ surah_data.name_latin }} - {{ surah_data.translations['id'].name }}
        </h1>
        <em class="text-sm block">Jika menemukan kesalahan, tolong <a href="https://github.com/tegarimansyah/quran.urusan.id/issues/new/choose" class="text-blue-600">tinggalkan komentar</a> atau email kami: <a href="mailto:imansyahtegar@gmail.com" class="text-blue-600">imansyahtegar [at] gmail [dot] com</a></em>
        <hr class="my-3">
      </div>
      <!-- List of Ayah -->
      <div v-for="currentTopic in surah_data.topics" :key="`${currentTopic.from}-${currentTopic.to}`">
        <intersect @enter="current_topic = `${currentTopic.topic}`">
          <span :class="{ hide: !enable_topic }" class="block font-bold mt-10 topic">{{ currentTopic.topic }}</span>
        </intersect>
        <!-- Sub Topic Start -->
        <div v-if="currentTopic.subs != null">
          <div v-for="sub in currentTopic.subs" :key="sub.from" :id="`topic-${sub.from}`">
            <span :class="{ hide: !enable_topic }" class="block font-light mt-5 ml-2 pb-2 topic border-blue-500 border-solid border-b">{{ sub.text }}</span>
            <!-- Display Ayah and Translation Start -->
            <div :id="ayah.numberInSurah" :class="{ hide: !enable_arabic && !enable_translation }" v-for="ayah in selectedAyah(sub.from, sub.to)" :key="ayah.numberInSurah">
              <div class="flex mt-1 mb-3 lg:p-8 grid grid-cols-12 gap-0 sm:gap-1 hover:bg-gray-300">
                <div class="col-span-3 lg:col-span-1 items-center lg:text-center border-gray-500 border-solid border-r mr-3">
                  <p class="py-3">
                    {{ ayah.numberInSurah }}
                  </p>
                  <p @click="save_ayah(ayah.numberInSurah)" class="py-3">
                    Save
                  </p>
                  <p @click="show_tafsir(ayah.numberInSurah, ayah.tafsir)" class="py-3">
                    Tafsir
                  </p>
                </div>
                <div class="col-span-9 lg:col-span-11">
                  <span :class="{ hide: !enable_arabic }" class="arabic font-mequran block mb-4 leading-loose tracking-wide text-right text-3xl">{{ ayah.arabic }}</span>
                  <span :class="{ hide: !enable_translation }" class="translation block">{{ ayah.translation }}</span>
                </div>
              </div>
            </div>

            <!-- Display Ayah and Translation End -->
          </div>
        </div>
        <!-- Sub Topic End -->
        <div v-else>
          <!-- Without sub topic -->
          <!-- Display Ayah and Translation Start -->
          <div :id="ayah.numberInSurah" :class="{ hide: !enable_arabic && !enable_translation }" v-for="ayah in selectedAyah(currentTopic.from, currentTopic.to)" :key="ayah.numberInSurah">
            <div class="flex mt-1 mb-3 ml-2 p-1 pt-3 grid grid-cols-12 gap-0 sm:gap-1 hover:bg-gray-300">
              <div class="col-span-3 lg:col-span-1 items-center lg:text-center border-gray-500 border-solid border-r mr-3">
                <p class="py-3">
                  {{ ayah.numberInSurah }}
                </p>
                <p @click="save_ayah(ayah.numberInSurah)" class="py-3">
                  Save
                </p>
                <p @click="show_tafsir(ayah.numberInSurah, ayah.tafsir)" class="py-3">
                  Tafsir
                </p>
              </div>
              <div class="col-span-9 lg:col-span-11">
                <span :class="{ hide: !enable_arabic }" class="arabic font-mequran block mb-4 leading-loose tracking-wide text-right text-3xl">{{ ayah.arabic }}</span>
                <span :class="{ hide: !enable_translation }" class="translation block">{{ ayah.translation }}</span>
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
            <span> {{ surah_data.name_latin }} - {{ surah_data.translations['id'].name }}</span> |
            <span v-on:click="scrollToTop"> Scroll to Top &#8593; </span>
          </span>
          <span class="text-base font-semibold tracking-widest text-gray-900 rounded-lg dark-mode:text-white">
            {{ current_topic }}
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
#mark{
    width: 100%;
    position: fixed; top: 300px;
    font-size: 16pt;
    border-bottom: dashed 2px currentColor;
    text-shadow: 0 0 10px black;
}
.container {
    @apply p-6 pb-40 m-auto;
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
import Intersect from 'vue-intersect'
import Modal from '@/components/Modal'
import Hash from '@/components/hash.js'

export default {
  components: { Intersect, Modal },
  head () {
    return {
      title: `Tadarus ${this.surah_name}`
    }
  },
  data () {
    return {
      current_topic: 'Akan Ditampilkan Topik',
      surah_name: '',
      surah_data: null,
      surah_number: null,
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
    // New
    this.surah_number = this.$route.params.surah
    const rawSurah = localStorage[`surah_${this.surah_number}`]

    if (!rawSurah) {
      // Tidak ada data tersimpan
      this.$axios.$get(process.env.baseURL + `/surah/${this.surah_number}.json`)
        .then((response) => {
          this.surah_data = response.data
          localStorage[`surah_${this.surah_number}`] = JSON.stringify(response)
        })
    } else {
      const surahData = JSON.parse(rawSurah)
      if (surahData.hash === Hash[this.surah_number]) {
        this.surah_data = surahData.data
      } else {
        this.$axios.$get(process.env.baseURL + `/surah/${this.surah_number}.json`)
          .then((response) => {
            this.surah_data = response.data
            localStorage[`surah_${this.surah_number}`] = JSON.stringify(response)
          })
      }
    }

    this.surah_name = this.surah_data.name_latin

    if (localStorage.enable_translation === undefined) {
      localStorage.enable_translation = 'true'
      localStorage.enable_topic = 'true'
      localStorage.enable_arabic = 'true'
    }
    this.enable_translation = localStorage.enable_translation === 'true'
    this.enable_topic = localStorage.enable_topic === 'true'
    this.enable_arabic = localStorage.enable_arabic === 'true'
    // end
  },
  methods: {
    show_tafsir (number, tafsir) {
      this.$store.commit('modal/set', { header: `${this.surah_data.name_latin} - ${number}`, body: tafsir })
    },
    save_ayah (number) {
      alert('Berhasil disimpan')
      localStorage.last_read = `${this.surah_number}/${number}`
    },
    selectedAyah (start, end) {
      const data = []
      for (let number = start; number <= end; number++) {
        data.push({
          numberInSurah: number,
          arabic: this.surah_data.text[number],
          translation: this.surah_data.translations.id.text[number],
          tafsir: this.surah_data.tafsir.id.kemenag.text[number]
        })
      }
      return data
    },
    scrollToTop () {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
}
</script>
