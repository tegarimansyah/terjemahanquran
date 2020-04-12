<template>
  <div class="flex hmin-screen m-10">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Cards class="m-auto" title="Memahami" description="Membaca arti Al Qur'an lebih mudah dengan pembagian topik bacaan dan tafsirnya." />
      <Cards class="m-auto" title="Mempelajari" description="Memahami perbedaan pengucapan antar huruf dan panjang pendek antar kata secara interaktif." />
      <Cards class="m-auto" title="Mendengar" description="Rekam dan dengarkan Murrotal Al Qur'an dari suara Anda sendiri." />
      <Cards class="m-auto" title="Saling Belajar" description="Bagikan bacaan Murrotalmu kepada yang lebih memahami agar dapat saling belajar dan memperbaiki" />
    </div>
  </div>
</template>

<script>
import Cards from '@/components/Cards'
import surahList from '~/components/surah.js'
import topicList from '~/components/topic.js'

export default {
  components: {
    Cards
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
