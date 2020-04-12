<template>
  <div class="fixed bottom-0 w-full text-gray-700 bg-white border-gray-300 border-t-2 dark-mode:text-gray-200 dark-mode:bg-gray-800">
    <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      <div class="px-4 pt-2 pb-2">
        <span class="block text-xs">
          <nuxt-link :to="`/tadarus`" class="underline"> &lt; Kembali</nuxt-link> |
          <span v-on:click="scrollToTop" class="underline"> {{ surahName }} </span>
        </span>
        <span class="text-base font-semibold tracking-widest text-gray-900 rounded-lg dark-mode:text-white">
          {{ topic }}
        </span>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 gap-4 text-center py-3 ">
        <span class="mr-3">Daftar Isi</span>
        <span class="mr-3">Tampilkan Arabic</span>
        <span class="mr-3">Tampilkan Terjemahan</span>
        <span class="mr-3">Tampilkan Topik</span>
      </div>
      <!-- <nav class="flex-col px-4 pb-3 flex-grow md:pb-0 md:flex md:justify-end md:flex-row">
        <span class="mr-3">Daftar Isi</span>
        <span class="mr-3">Tampilkan Arabic</span>
        <span class="mr-3">Tampilkan Terjemahan</span>
        <span class="mr-3">Tampilkan Topik</span>
      </nav> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    surahName: {
      type: String,
      default: 'Al Fatihah - Pembuka'
    },
    surahLink: {
      type: String,
      default: '#'
    },
    topic: {
      type: String,
      default: 'Kewajiban para washi terhadap asuhannya dan para wali terhadap orang yang di bawah perwaliannya'
    }
  },
  methods: {
    scrollToTop () {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

}
</script>

<style>
.nav_text {
  @apply px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg;
}

</style>
