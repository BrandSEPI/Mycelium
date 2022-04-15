<template>
  <div class="post">
    <div class="contentLeft">
      <div class="data">
        <img class="userLogo" src="../assets/user.png" alt="">
        <div class="info"> Created at <span> {{post.created_at.substring(0,10)}} </span> by <span class="bold" v-on:click="goProfile(post.user_id)"> {{post.username}}  </span> </div>
      </div>
      <img class="image" :src="post.image" alt="">
    </div>
    <div class="contentRight">
      <div class="title"> {{post.title}}</div>
      <div class="text">{{post.content}}</div>
      <div class="link">Access to original Website <a :href="post.link" target="_BLANK"> here </a>  </div>


      <div class="buttons">
        <button class="btn full" v-on:click="openPost(post.id)">See more</button>
        <div>
          <button class="btn full" v-on:click="vote(post.id, 1)" > <img class="upvote" src="../assets/leaves.png" alt="upvote"> {{post.score}} </button>
          <button class="btn empty" v-on:click="vote(post.id, -1)"> <img class="downvote" src="../assets/death.png" alt="downvote"> </button>
        </div>
        <button class="btn empty" v-on:click="this.$store.dispatch('notification', 'Request registered: Our Administration Team will check it !')">Report</button>
      </div>
     
    </div>
  </div>


</template>

<script>
export default {
  name: 'PostBlock',
  props: {
    post: Object,
  },

  methods: {
    goProfile(id) {
      this.$router.push('/user/'+id)   
    },

    openPost(id) {
      this.$router.push('/post/'+id)   
    },

    vote(post_id, score) {
      this.$store.dispatch('postVote', {post_id: post_id, score: score})
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
  justify-content: space-between;
  max-width: 850px;
  margin-bottom: 5px;
  background-color: var(--white);
  padding-bottom: 10px;
  border-radius: 20px;
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

    .bold:hover {
      font-weight: 400;
    }
 }

  .image {
    width: 300px;
    height: 275px;
    border-radius: 20px;

  }


}

.contentRight {
  max-width: 400px;
  padding: 20px 40px;
  color: var(--textBlack);
  flex-grow: 2;

  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .text {
    overflow-y: auto;
    height: 202px;
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
  }

  .link {
    font-size: 12px;
    text-align: left;
    padding-left: 10px;
    margin-bottom: 20px;
  }

  a {
    color: var(--textBlack);
    text-decoration: underline;
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

    .btn:hover {
      background-color: var(--green3);
      border-color: var(--green3);
      color: var(--white);
    }

    .btn:hover .upvote, 
    .btn:hover .downvote {
      filter:brightness(100);
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
