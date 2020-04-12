<template>
  <div class="fixed bottom-0 w-full text-gray-700 bg-white border-gray-300 border-t-2 dark-mode:text-gray-200 dark-mode:bg-gray-800">
    <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      <div class="px-4 pt-2 pb-2">
        <span class="block text-xs">Terakhir Dibaca</span>
        <nuxt-link :to="`/tadarus/${surahLink}`" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white">
          {{ surahName }}
        </nuxt-link>
      </div>
      <nav class="flex-col px-4 pb-3 flex-grow md:pb-0 md:flex md:justify-end md:flex-row">
        <span class="mr-4">Ayat Tersimpan</span>
        <span class="mr-4">Lihat Kategori</span>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    surahName: {
      type: String,
      default: 'Belum Ada'
    },
    surahLink: {
      type: String,
      default: '#'
    }
  }

}
</script>

<style>
.nav_text {
  @apply px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg;
}

</style>
