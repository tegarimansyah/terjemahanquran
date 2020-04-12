<template>
  <intersect @enter="msg = 'Intersected'" @leave="msg = 'Not intersected'">
    <div>{{ msg }}</div>
  </intersect>
</template>

<script>
import Intersect from 'vue-intersect'

export default {
  components: { Intersect },
  data () {
    return {
      msg: 'I will change'
    }
  }
}
</script>
