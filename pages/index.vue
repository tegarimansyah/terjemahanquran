<template>
  <div class="m-10">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Cards title="Menkaji" description="Membaca arti Al-Qur'an lebih mudah dengan pembagian topik bacaan dan tafsirnya." button-text="Mulai Menkaji" button-link="tadarus" />
      <Cards title="Mempelajari" description="Memahami perbedaan pengucapan antar huruf dan panjang pendek antar kata secara interaktif." button-text="Mulai Belajar (Coming Soon)" button-link="belajar" />
      <Cards title="Murrotal" description="Rekam dan dengarkan bacaan murrotal Al-Qur'an dari suara Anda sendiri." button-text="Mulai Murrotal (Coming Soon)" button-link="murrotal" />
      <Cards title="Saling Belajar" description="Bagikan bacaan Murrotalmu kepada yang lebih memahami agar dapat saling belajar dan memperbaiki" button-text="Mulai Berbagi (Coming Soon)" button-link="berbagi" />
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
