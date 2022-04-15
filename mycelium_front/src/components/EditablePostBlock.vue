<template>
  <div class="post">
    <div class="contentLeft">
      <div class="data">
        <img class="userLogo" src="../assets/user.png" alt="">
        <div class="info"> Created at <span> {{currentDate()}} </span> by <span> {{this.$store.getters.getUser.username}}  </span> </div>
      </div>
      <img class="image" :src="this.$store.getters.getNewPost.image" alt="">
    </div>
    <div class="contentRight">

      <textarea class="title" :value="this.$store.getters.getNewPost.title" v-on:blur="updateNewPost()" ref="title"></textarea>
      <textarea class="text" :value="this.$store.getters.getNewPost.content" v-on:blur="updateNewPost()" ref="content"></textarea>
      <div class="link">Access to original Website <a> here </a>  </div>

      <div class="buttons">
        <button class="btn full">See more</button>
        <div>
          <button class="btn full">  <img class="upvote" src="../assets/leaves.png" alt="upvote"> 0 </button>
          <button class="btn empty"> <img class="downvote" src="../assets/death.png" alt="downvote"> </button>
        </div>
        <button class="btn empty">Report</button>
      </div>
     
    </div>
  </div>


</template>

<script>
export default {
  name: 'PostBlock',

  methods: {
      currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    },

    updateNewPost() {
      console.log("updateNewPost");
      this.$store.dispatch('updateNewPost', {title: this.$refs.title.value, content: this.$refs.content.value})
    }
  },
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

.post {
  font: 100% $font-stack;
  font-weight: 300;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 850px;
  margin-bottom: 1px;
  background-color: var(--white);
  padding-bottom: 10px;
  filter: drop-shadow(0px 4px 4px var(--shadowBlack));
  border-radius: 20px;
}

textarea {
  font: 100% $font-stack;
  width: 100%;
  max-width: 100%;
  padding: 5px 10px;
  margin-top: -5px;
  border-radius: 10px;
  border: dashed 1.5px var(--green3);
  font-weight: 300;
  background-color: var(--white);
  color: var(--textBlack);
}

a {
  color: var(--textBlack);
  text-decoration: underline;
}

.contentLeft {
  padding: 17px;
  font-size: 12px;

 .data {
    display: flex;

    .userLogo {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin: 0 10px 25px 0;
    }
    .info {
      color: var(--textGrey);
      max-width: 250px;
      padding-top: 10px;
    }
  
    span {
      color: var(--textBlack);
    }
 }

  .image {
    width: 300px;
    height: 275px;
    border-radius: 20px;
  }
}

.contentRight {
  max-width: 420px;
  padding: 20px 40px;

  .title {
    font-size: 24px;
    margin-bottom: 20px;
    height: 30px;
  }

  .text {
    overflow-y: auto;
    height: 190px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
  }

  .link {
    font-size: 12px;
    text-align: left;
    padding-left: 10px;
    margin-bottom: 20px;
    color: var(--textBlack);
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    
    .btn {
      margin: 0 2px;
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid var(--green1);
      font-size: 12px;
      font-weight: 300;
      color: var(--textBlack);
    }

    .full {
      background-color: var(--green1);
    }

    .empty {
      background-color: var(--white);
    }

    .upvote {
      margin: -3px -5px -5px -15px;
      width: 35px;
      height: 20px;
    }

    .downvote {
      margin: -7px -15px -7px -15px;
      width: 35px;
      height: 25px;
    }
  }
}


</style>
