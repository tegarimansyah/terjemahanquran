<template>
  <div class="max-w-xs rounded overflow-hidden shadow-lg">
    <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        {{ title }}
      </div>
      <p class="text-grey-darker text-base">
        {{ description }}
      </p>
    </div>
    <div class="px-6 py-4 text-center align-bottom">
      <nuxt-link :to="`/${buttonLink}`">
        <button class="inline-flex items-center justify-center px-4 py-2 text-base leading-5 rounded-md border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-600 border-blue-600 text-gray-100 hover:bg-blue-500 hover:border-blue-500 hover:text-gray-100">
          {{ buttonText }}
        </button>
      </nuxt-link>
      <br>
      <nuxt-link :to="`/${buttonLink}/detail`">
        <button class="mt-1 inline-flex items-center justify-center px-4 py-2 text-base leading-5 rounded-md border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-green-600 border-green-600 text-gray-100 hover:bg-green-500 hover:border-green-500 hover:text-gray-100">
          Lebih detail
        </button>
      </nuxt-link>
      <!-- <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'title': {
      type: String,
      default: null
    },
    'img': {
      type: String,
      default: null
    },
    'description': {
      type: String,
      default: null
    },
    'buttonText': {
      type: String,
      default: null
    },
    'buttonLink': {
      type: String,
      default: null
    }
  }
}
</script>

<style>

</style>
