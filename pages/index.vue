<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold">
      Enjoy The Qur'an
    </h1>
    <em class="text-sm">Alpha version, need more collaborator for this <a href="https://github.com/tegarimansyah/quran.urusan.id" class="text-blue-600">open source project</a></em>
    <p>Read Al Qur'an or translation. Understanding what you read. This site still a Proof of Concept.</p>
    <hr class="my-3">
    <p><strong>Things to add</strong>: Bookmark, separate by theme, full offline capability, jump to section, add our recitation.</p>
    <hr class="my-3">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <nuxt-link :id="index+1" v-for="(surah, index) in surah_list" :key="index+1" :to="`/${index+1}`">
        <div class="mt-1 mb-3 p-1 pt-3 col-span-1 hover:bg-gray-300">
          <span class="block font-semibold">{{ index+1 }} - {{ surah.id.surah_name }}</span>
          <span class="block">{{ surah.id.surah_translation }}</span>
          <span class="block">{{ surah.id.total_ayah }} ayahs</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import surahList from '~/components/surah.js'

export default {
  data () {
    return {
      surah_list: surahList('all')
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
