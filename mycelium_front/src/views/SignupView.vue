<template>
  <router-link to="/" class="logo"></router-link>
  
  <div class="container">
    <h1>SIGN UP</h1>
    
    <label for="username">Username</label>
    <input type="text" name="username" placeholder="Denis" ref="username" />
    <label for="email">Email</label>
    <input type="text" name="email" placeholder="Denis@gmail.com" ref="email" />
    <label for="phone">Phone</label>
    <input type="text" name="phone" placeholder="07 73 01 27 10" ref="phone" />
    <label for="password">Password</label>
    <input type="password" name="password" ref="password" />

    <div class="errorNotif" v-if="this.$store.getters.getLoginError != 'null'">
      {{this.$store.getters.getLoginError}} 
    </div>

    <button class="btn" v-on:click="submit(this.$refs.username.value, this.$refs.email.value, this.$refs.phone.value, this.$refs.password.value)"> Sign up </button>
    <div class="more">
      Already have an account ? Login
      <router-link class="link" to="/login/signin"> here </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupView",

  methods: {
    async submit(username, email, phone, password) {
      this.$store.dispatch("signup", { username, email, phone, password });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/base";

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
  margin: -30px auto;
  padding: 40px 40px 5px 40px;
  border: solid 2px var(--green3);
  border-radius: 20px;
  background-color: var(--white);
  color: var(--textBlack);

  h1 {
    font-size: 28px;
    font-weight: 300;
    letter-spacing: 0.2em;
    margin-bottom: 70px;
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
      color: var(--black);
    }

    .link:hover {
      color: var(--green2);
    }
  }
  .errorNotif {
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 0.8em;
    border: solid 0.5px var(--red1);
    background-color: var(--white);
    color: var(--textBlack);
    margin-bottom: -20px ;
  }
}
</style>
