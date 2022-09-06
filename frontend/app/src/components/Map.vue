<template>
  <div style="">
    <GmapMap
      :center="{lat: coordinates.lat, lng:coordinates.lng}"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 900px; margin: auto"
    >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    >
    </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
    name: 'Map',
    data() {
        return{
            coordinates: {
                lat:0,
                lng:0,
            }
          }
        },
        created(){
        this.$getLocation({})
        .then(coordinates => {
            this.coordinates = coordinates;
        }).catch(error => alert(error));

    },
      }
</script>