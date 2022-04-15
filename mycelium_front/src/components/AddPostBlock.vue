<template>
  <div class="container">
    <div class="title">Contribute to mycelium</div>
    <router-link to="/newpost" class="btn">New Post</router-link>
  </div>


</template>

<script>
export default {
  name: 'AddPostBlock',
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

  .btn {
    margin: 10px 0;
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
    color: white;
  }
}



</style>
