<template>
    <div style="margin: auto; justify-content: center; width: 50%;">
      <b-form v-on:submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
  
        <b-form-group id="input-group-2" label="Shop name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Enter shop name"
            required
          ></b-form-input>
        </b-form-group>
  
        <b-form-group id="input-group-3" label="Wroking hours:" label-for="input-3">
          <b-form-timepicker
            id="input-3"
            v-model="form.time1"
            style="width:50%;margin:auto"
            required
          ></b-form-timepicker>
           <b-form-timepicker
            id="input-4"
            v-model="form.time2"
            style="width:50%;margin:auto"
            required
          ></b-form-timepicker>
        </b-form-group>
        <b-form-group id="input-group-4" label="Shop Coordinates:">
          <b-button @click="getLocation">Get my Location</b-button>
          <div v-if="form.location">
            Your coordinates are: {{form.location.lat}},{{form.location.lng}}
          </div>
        </b-form-group>
  
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
  
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
    export default {
      name:"RegisterShop",
      data() {
        return {
          form: {
            name: '',
            email: '',
            time1:'',
            time2:'',
            location:0
          },
        }
      },
      methods: {
        onSubmit() {
          axios
          .post('http://localhost:3000/api/register', this.form, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
            }
           })
          .then(res => alert("Successfully Registered Shop!"))
          .catch(error => console.log(error));
        },
        onReset() {
          // Reset our form values
          this.form.email = ''
          this.form.name = ''
          this.form.time1 = null
          this.form.time2 = null
          // Trick to reset/clear native browser form validation state
          this.show = false
          this.$nextTick(() => {
            this.show = true
          })
        },
        getLocation() {
          this.$getLocation({})
          .then(coordinates => {
              this.form.location = {lat:coordinates.lat, lng:coordinates.lng};
          }).catch(error => alert(error));
        }
      }
    }
  </script>