<template>

 <div class="com">
    <div class="content">
      <div class="info">
        <img class="logo" src="../assets/user.png" alt="">
        <div class="user">{{com.owner}}</div> 
        <span> . </span> 
        <div class="date">{{com.created_at.split('T')[0]}}</div>
        <span> . </span> 
        <div v-if="com.hide" class="date">Moderated</div>
      </div>
    
      <div class="text" v-bind:class="{ grey: com.hide }" >{{com.content}}</div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'CommentsBlock',

  props: {
    com: Object
  },
  data(){
console.log(this.com);
  },
  methods: {
    hideCom(id, value) {
      this.$store.dispatch('setHideCom', {id, value})
    }
  },
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

.com {
  display: flex;
  max-width: 750px;
  margin: 15px 0;

  .content {

    .info {
      width: 100%;
      display: flex;

      .logo {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin: 0 10px 10px 0;
      }

      .user {
        margin-top: 5px;
        font-weight: 500;
      }

      span {
        color: $textGrey;
        padding: 0 7px;
      }

      .date {
        margin-top: 5px;
        color: $textGrey;
      }
    }

    .text {
      margin-left: 15px;
      padding-left: 20px;
      border-left: solid 1px $grey1;
    }

    .grey {
      color: $textGrey;
    }
  }

  .more {
    display: flex;
    align-items: flex-start;

    button {
      visibility: hidden;
      margin: 0px 20px 0 20px;
      padding: 5px 10px;
      font-size: 10px;
      border-radius: 10px;
      background-color: $white;
      border: solid 1px $green2;
    }

    button:hover {
      background-color: $green3;
      border: solid 1px $green3;
      color: $white;
    }
  }
}

.com:hover button {
  visibility: visible;
}

</style>
