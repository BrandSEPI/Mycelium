<template>
  <div class="container">
    <div class="title">Important members</div>

    <router-link to="/" class="link">
    <div class="member">
      <div class="user"> Dam'S </div>
      <div class="flex">
        <div class="info"> Grown <span> 24/03/1997 </span></div>
        <div class="info"> Post <span> 999+ </span></div>
        <div class="info"> Upvote <span> 100 </span></div>
      </div>
    </div>
    </router-link>

    <router-link to="/">
    <div class="member">
      <div class="user"> Mati </div>
      <div class="flex">
        <div class="info"> Grown <span> 12/05/1998 </span></div>
        <div class="info"> Post <span> 789 </span></div>
        <div class="info"> Upvote <span> 981 </span></div>
      </div>
    </div>
    </router-link>

    <router-link to="/">
    <div class="member">
      <div class="user"> Lulu </div>
      <div class="flex">
        <div class="info"> Grown <span> 25/02/1996 </span></div>
        <div class="info"> Post <span> 988 </span></div>
        <div class="info"> Upvote <span> 234 </span></div>
      </div>
    </div>
    </router-link>

    <router-link to="/">
    <div class="member">
      <div class="user"> BrandS </div>
      <div class="flex">
        <div class="info"> Grown <span> 07/10/1998 </span></div>
        <div class="info"> Post <span> 214 </span></div>
        <div class="info"> Upvote <span> 190 </span></div>
      </div>
    </div>
    </router-link>

  
    
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
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }

  .member {
    width: 200px;
    margin-bottom: 20px;
    padding: 0 20px;
    border-left: solid 2px var(--green2);
    text-align: left;

    .flex {
      display: flex;
    }

    .user {
      color: var(--textBlack);
      text-decoration: none;
      font-size: 16px;
    }
    .info {
      color: var(--textGrey);
      font-size: 10px;
      margin: 10px 10px 0 0 ;
    }

    .info span {
      color: var(--textBlack);
    }

  }

}



</style>
