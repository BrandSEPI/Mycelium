<template>

  <div class="all" v-bind:class="{ dark: darkMode, light: lightMode }">

    <div class="notification" v-if="checkNotif() == true">{{this.$store.getters.getNotif}}</div>
    <div v-if="this.$store.getters.getDarkMode == 'false'" v-on:click="toggleDark('true')" class="darkPopUp"  >Try Dark mode !</div>
    <div v-if="this.$store.getters.getDarkMode == 'true'"  v-on:click="toggleDark('false')" class="darkPopUp">Back to Light mode</div>

    <router-view/>
  </div>

</template>


<script>

export default {
name: 'App',

 methods: {
    checkNotif() {
        if (this.$store.getters.getNotif == 'null') {
          return false
        }else {
          return true
        }
      },

    toggleDark(value) {
      this.$store.dispatch("setDarkMode", value)
    }
  },

  created() {
    if (localStorage.getItem('darkMode') == null) {
      console.log("Set Dark Mode to false by default");
      localStorage.setItem('darkMode', false)
    }

    this.$store.dispatch("setDarkMode", localStorage.getItem('darkMode'))
  },

  computed: {
    darkMode() {
      if (this.$store.getters.getDarkMode == "true")
      return true
      else
      return false
    },
    lightMode() {
      if (this.$store.getters.getDarkMode == "false")
      // if (localStorage.getItem('darkMode') == "false")
      return true
      else
      return false
    }
  },
}

</script>


<style lang="scss">
@import "@/scss/base";


.light{
  --primary-color: #333;
  --green1: #b5ca8d;
  --green2: #8bb174;
  --green3: #426b69;
  --green4: #2a4849;
  --red1: #b14537;
  --red2: #8f352a;
  --grey1: #f4f4f4;
  --grey2: #e4e4e4;

  --white: #fff;
  --black: #000;
  --textBlack: #202020;
  --textGrey: #b4b4b4;
  --textPlaceholder: rgba(42, 72, 73, 0.5);

  --bgWhite: rgb(241, 241, 241);
  --shadowBlack: rgba(0, 0, 0, 0.05);
}

.dark{
  --primary-color: #ccc;
  --green1: #ca8d8d;
  --green2: #c97373;
  --green3: #ca8d8d;
  --green4: #492a2a;
  --red1: #b14537;
  --red2: #8f352a;
  --grey1: #f4f4f4;
  --grey2: #e4e4e4;

  --white: rgb(30, 30, 30);
  --black: rgb(255, 255, 255);
  --textBlack: #e0e0e0;
  --textGrey: #5b5b5b;
  --textPlaceholder: rgba(255, 255, 255, 0.5);

  --bgWhite: rgb(15, 15, 15);
  --shadowBlack: rgba(255, 255, 255, 0);
}


.all {
  background-color: var(--bgWhite);
  min-height: 100vh;
}



#app {
  font: 100% $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
}

nav a {
  font-weight: bold;
  font: 100% $font-stack;
  color: $white;
  font-weight: 300;
  text-decoration: none;
}

nav a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.notification {
  z-index: 100;
  position: sticky;
  float: right;
  top: 20px;
  margin: -20px 20px 0 -150px;
  width: 100px;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.8em;
  border: solid 0.5px rgb(230, 230, 230);
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  color: var(--black);
}

.darkPopUp {
  z-index: 100;
  position: sticky;
  float: right;
  top: 92vh;
  margin: -20px 10px 0 -150px;
  width: 100px;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.8em;
  background-color: var(--white);
  color: var(--black);
  border: dashed 1.5px var(--black);
}

.darkPopUp:hover {
  background-color: var(--black);
  color: var(--white);
  opacity: 0.8;
}

</style>
