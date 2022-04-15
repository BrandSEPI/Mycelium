<template>

  <nav>
    <router-link to="/" class="logo"></router-link>
    <h1>User Profile</h1>
    <div class="flex">
      <div v-on:click="goProfile()" class="option profile">Profile</div>

      <router-link to="/login/signin" v-if="checkLogged() == false" class="option logout">Login</router-link>
      <div v-on:click="logout()" v-if="checkLogged() == true" class="option logout">Logout</div>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'AddPostBlock',

  methods: {

    goProfile() {
      this.$router.push('/user/'+atob(localStorage.getItem('id')));  
    },

    logout() {
      localStorage.removeItem('bearer')
      localStorage.removeItem('id')
      this.$router.push('/login/signin')
    },

    checkLogged() {
      return localStorage.getItem('bearer') != null
    },

    visible() {
        return this.$store.getters.isAdmin
    }
  }
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

nav {
  z-index: 10;
  top: 0;
  position: sticky;
  font: 100% $font-stack;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: var(--green3);
  border-radius: 0 0 5px 5px;
  color: var(--white);

.flex {
  display: flex;
}

.logo {
  width: 40px;
  background-color: var(--white);
  background-image: url(../assets/YOWL_logo.png);
  background-position: center;
  background-size: cover;
  height: 30px;
  border-radius: 5px;
}

.logo:hover {
  filter:grayscale(10)
}

.search {
  background-color: var(--white);
  color: var(--textBlack);
  border-radius: 5px;
  border: none;
  width: 40vw;
  padding: 5px 20px ;
  margin: 0 20px;
}

.search:focus {
  outline: none;
}

.option {
  padding: 5px 20px ;
  margin: 0 20px;
  border-radius: 5px;
  color: var(--white);
}

.option:hover {
background-color: rgba(255, 255, 255, 0.2);
}


}




</style>
