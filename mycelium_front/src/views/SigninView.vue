<template>

  <router-link to="/" class="logo"></router-link>

  <div class="container">
    <h1>LOGIN</h1>
    <label for="username">Email</label>
    <input type="text" name="email" placeholder="email" ref="email">
    <label for="password">Password</label>
    <input type="password" name="password" ref="password">

    <button class="btn" v-on:click="submit(this.$refs.email.value, this.$refs.password.value)">Login</button>
    <div class="more">Need an account ?  Signup <router-link class="link" to="/login/signup"> here </router-link> </div>

  </div>

</template>

<script>

export default {
  name: 'SigninView',
    methods: {
    submit(email, password) {      
      this.$store.dispatch('signin', {email, password})
    }
  },
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

.logo {
  display: block;
  width: 70px;
  height: 70px;
  position: sticky;
  top:10px;
  left: 10px;
  background-color: var(--white);
  background-image: url(../assets/YOWL_logo.png);
  background-position: center;
  background-size: cover;
  border-radius: 5px;
}

.logo:hover {
  background-color: var(--grey1);
}

.container {
  font: 100% $font-stack;
  font-weight: 300;
  max-width: 350px;
  margin: 40px auto;
  padding: 40px 40px 5px 40px;
  border: solid 2px var(--green3);
  border-radius: 20px;
  background-color: var(--white);
  color: var(--textBlack);

  h1 {
    font-size: 28px;
    font-weight: 300;
    letter-spacing: 0.2em;
    margin-bottom: 100px;
  }

  label {
    display: block;
    text-align: left;
    font-size: 12px;
    margin: 0 0 5px 5px;
  }

  input {
    width: 90%;
    background: none;
    background-color: var(--grey1);
    border: none;
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom: 30px;
  }

  input:focus {
    outline: solid 1.5px var(--green2);
  }

  .btn {
    margin: 50px auto;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    background-color: var(--green1);
    font-size: 12px;
    font-weight: 300;
  }

  .btn:hover {
    background-color: var(--green3);
    color: var(--white);
  }

  .more {
    text-align: left;
    font-size: 12px;

    .link {
      color: var(--black) ;
    }

    .link:hover {
      color: var(--green2);
    }
  }

}


</style>
