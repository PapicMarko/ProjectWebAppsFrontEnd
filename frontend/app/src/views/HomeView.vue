<template>
  <div class="home">
    <div class="map">
    <Map />
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'

export default {
  name: 'HomeView',
  components: {
    Map
  }
}
</script>
