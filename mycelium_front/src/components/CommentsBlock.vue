<template>

 <div class="com">
    <div class="content">
      <div class="info">
        <img class="logo" src="../assets/user.png" alt="">
        <div class="user">{{com.username}}</div> 
        <span> . </span> 
        <div class="date">{{com.created_at.replace("T", " - ").substring(0,21)}}</div>
        <span> . </span> 
        <div v-if="com.hide" class="date">Moderated</div>
      </div>
    
      <div class="text" v-bind:class="{ grey: com.hide }" >{{com.content}}</div>
    </div>
  
    <div class="more">
      <button v-if="hidden(com.hide) == 0" v-on:click="hideCom(com.id, com.content, 1)" > Hide </button>
      <button v-if="hidden(com.hide) == 1"  v-on:click="hideCom(com.id, com.content, 0)"> Show </button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'CommentsBlock',

  props: {
    com: Object
  },
  methods: {
    hideCom(id, content, hide) {
      this.$store.dispatch('updateCom', {id: id, content: content, hide: hide})
    },
    hidden(hide) {
      if (this.$store.getters.isAdmin == true || atob(localStorage.getItem('id')) == this.$store.getters.getPost.user_id) {
        return hide
      }
      else {
        return null
      } 
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
        color: var(--textBlack);
      }

      span {
        color: var(--textGrey);
        padding: 0 7px;
      }

      .date {
        margin-top: 5px;
        color: var(--textGrey);
      }
    }

    .text {
      margin-left: 15px;
      padding-left: 20px;
      border-left: solid 1px var(--grey1);
      color: var(--textBlack);
    }

    .grey {
      color: var(--textGrey);
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
      background-color: var(--white);
      border: solid 1px var(--green2);
      color: var(--textBlack);
    }

    button:hover {
      background-color: var(--green3);
      border: solid 1px var(--green3);
      color: var(--white);
    }
  }
}

.com:hover button {
  visibility: visible;
}

</style>
