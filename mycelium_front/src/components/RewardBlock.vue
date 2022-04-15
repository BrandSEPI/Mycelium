<template>
  <div class="container">
    <div class="title">Hi little fungi</div>
    <div class="content">Thanks to use our brand new bio interconnect network. You can find and create important topics, and grow our community. <br><br>
    To support out team, you can buy us a fungus </div>
    <router-link to="/" v-on:click="this.$store.dispatch('notification', 'Thank you !')" class="btn">Support</router-link>
  </div>


</template>

<script>
export default {
  name: 'RewardBlock',
  props: {
    msg: String
  }
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  font: 100% $font-stack;
  font-weight: 300;
  background-color: var(--white);
  filter: drop-shadow(0px 4px 4px var(--shadowBlack));
  border-radius: 10px;
  color: var(--textBlack);
    
  .title {
    font-size: 20px;
    text-align: center;
    padding: 15px 0;
  }

  .content {
    font-size: 12px;
    margin: 0 20px;
  }

  .btn {
    margin: 20px 0;
    padding: 7px 20px;
    border-radius: 10px;
    border: none;
    font-size: 12px;
    font-weight: 300;
    background-color: var(--green1);
  }

  a {
    text-decoration: none;
    color: var(--textBlack);
  }

  a:hover {
    background-color: var(--green3);
    color: var(--white);
  }
}



</style>
