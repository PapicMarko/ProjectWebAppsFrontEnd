<template>
  <div style="">
  
      <GmapMap
          :center="{lat: coordinates.lat, lng:coordinates.lng}"
          :zoom="15"
          map-type-id="terrain"
          style="width: 100%; height: 900px; margin: auto"
      >
      <GmapInfoWindow
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infowWinOpen=false"
      >
      </GmapInfoWindow>
      <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :ref="`marker${index}`"
      :position="{lat:m.location.lat, lng:m.location.lng}"
      :clickable="true"
      :draggable="true"
      @click="toggleInfoWindow(m,index)"
      />
      </GmapMap>
      <div v-if="show" style="background-color: lightgray;">
          <b-form v-on:submit.prevent="onSubmit">
          <b-form-group
              id="input-group-1"
              label="Full name:"
              label-for="input-1"
          >
              <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="Enter name"
              style="width:50%;margin:auto" 
              required
              ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Contact info:" label-for="input-2">
              <b-form-input
              id="input-2"
              v-model="form.contact"
              placeholder="Enter phone number"
              style="width:50%;margin:auto" 
              required
              ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Date and Time: " label-for="input-3">
              <b-form-datepicker
              id="example-datepicker"
              v-model="form.date"
              style="width:50%;margin:auto" 
              class="mb-2">
              </b-form-datepicker>
              <b-form-timepicker
              id="input-3"
              v-model="form.time"
              style="width:50%;margin:auto"
              required
              ></b-form-timepicker>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      </div>
      
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Map',
  data() {
      return{
          coordinates: {
              lat:0,
              lng:0,
          },
          markers:{
          },
          form:{
              name:'',
              contact:'',
              time: '',
              date:'',
              shopName:'',
          },
          infoOptions: {
              content: '',
          //optional: offset infowindow so it visually sits nicely on top of our marker
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        selectedShop:'',
        el:null,
        show:false,
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
      }
  },
  created(){
      this.$getLocation({})
      .then(coordinates => {
          this.coordinates = coordinates;
      }).catch(error => alert(error));

      axios.get("http://localhost:3000/api/getAllShops")
      .then(res => {
          this.markers = res.data;
      })
      .catch(error => console.log(error))
  },
  methods:{
      toggleInfoWindow: function(marker, idx) {
          this.infoWindowPos = marker.location;
          this.infoOptions.content = this.getInfoContent(marker);
          this.selectedShop = marker;
          this.form.shopName = marker.name
          if(this.show == false){
              this.show = true
          }else{
              this.show= false
          }

          //check if its the same marker that was selected if yes toggle
          if (this.currentMidx == idx) {
            this.infoWinOpen = !this.infoWinOpen;
          }
          //if different marker set infowindow to open and reset current marker index
          else {
            this.infoWinOpen = true;
            this.currentMidx = idx; 
          }
        },
        getInfoContent: function(marker){
          return(
              `<div class="">
        <div>
          <div>
            <div class="m-2"><span style="font-weight: bold;">Shop name: </span>
              ${marker.name}
            </div>
          </div>
        </div>
      </div>`
          );
        },
        onSubmit(){
          axios
          .post('http://localhost:3000/api/bookAppointment', this.form, {
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
          }
          })
          .then(res => alert("Successfully Booked Appointment!"))
          .catch(error => console.log(error));
        }
  }
}
</script>