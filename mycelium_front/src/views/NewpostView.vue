<template>

  <router-link to="/" class="logo"></router-link>

  <div class="wrapper">

    <h1>Create your new post</h1>

    <div class="research">
      <label for="url" >url</label>
      <input name="url" type="text" placeholder="http://something_on_internet.com" ref="url">
      <button class="btn" v-on:click="search()" >LOAD</button>
      <div v-if="this.loading == true" class="loading">LOADING</div>
    </div>

    <div class="info">Result</div>
    <EditablePostBlock></EditablePostBlock>
    
    <button class="btn save" v-on:click="save()" >SAVE</button>

  </div>

</template>

<script>
import EditablePostBlock from '@/components/EditablePostBlock.vue'

export default {
  name: 'NewpostView',

  components: {
    EditablePostBlock,
  },

  data() {
    return {
      loading: false
    }
  },

  mounted() {
    this.$store.dispatch('setNewPost', {link: "" ,title: "", content: "", image: "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png"})
  },

  methods: {
    async search() {

      console.log("... searching on : ", this.$refs.url.value);
      this.loading = true

      var Meta = require('html-metadata-parser');
      var result = await Meta.parser(this.$refs.url.value);
      console.log("Load: ", result);

      if (result == null) {
        console.log("Result is null, this page doesn't return any MetaData");
      }
      else {

        if ("images" in result) {
          console.log("Image: ",result.images[0].src)
          this.$store.dispatch('setNewPost', {link: this.$refs.url.value ,title: result.meta.title, content: result.meta.description, image: result.images[0].src})
        }
        else {
          console.log("No image");
          this.$store.dispatch('setNewPost', {link: this.$refs.url.value, title: result.meta.title, content: result.meta.description, image:"https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png"})
        }
      }
        
      console.log("... end");
      this.loading = false
    },

    async save() {
      console.log("saving post ...");
      await this.$store.dispatch('postPost')
      this.$router.push('/')
    }

  }
}
</script>




<style lang="scss" scoped>

@import '@/scss/base';

.logo {
  position: fixed;
  top: 0;
  display: block;
  width: 70px;
  height: 70px;
  margin: 10px;
  background-color: var(--white);
  background-image: url(../assets/YOWL_logo.png);
  background-position: center;
  background-size: cover;
  border-radius: 5px;
}

.logo:hover {
  background-color: var(--grey1);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  font: 100% $font-stack;
  font-weight: 300;
  max-width: 850px;
  margin: auto;
}

h1 {
  margin-top: 20px;
  font-weight: 300;
  color: var(--textBlack);
}

.btn {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: var(--green1);
  border-radius: 10px;
  border: none;
}

.btn:hover {
    background-color: var(--green2);
  }

.save {
  padding: 10px 50px;
  margin-top: 60px;
}

.info {
  align-self: flex-start ;
  margin: 0 0 10px 20px;
  color: var(--textGrey);

}

.research {
  font: 100% $font-stack;
  margin: 20px 0 50px 0;
  width: 55%;
  

  label {
    display: block;
    padding: 0 0 5px 20px;
    text-align: left;
    font-size: 12px;
    font-weight: 100;
    color: var(--textBlack);
  }

  input {
    width: 70%;
    padding: 10px 20px;
    background-color: var(--white);
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    color: var(--textBlack);
  }

  input:focus {
  outline: solid 2px var(--green3);
  }
}


.loading {
  display: inline-block;
  margin-left: 10px ;
  padding: 7px 15px;
  border-radius: 10px;
  font-size: 10px;
  animation: blink 0.5s infinite alternate ease-in-out;
}

@keyframes blink {
  from { 
    background-color: var(--grey1);
    color: var(--textGrey); 
  }
  to { 
    background-color: var(--grey2);
    color: var(--textBlack); 
  }
}

</style>