<template>

  <NavBlock></NavBlock>

  <div class="wrapper">

    <PostBlock :post="this.$store.getters.getPost"></PostBlock>

    <div class="container">

      <div class="header">
        <span class="title">Comments</span>

        <button v-if="this.$store.getters.getComsHidden == true" v-on:click="toggleComHidden(false)" class="btn">Show hidden comments</button>
        <button v-if="this.$store.getters.getComsHidden == false" v-on:click="toggleComHidden(true)" class="btn">Hide moderated comments</button>
      </div>
      
      <CommentsBlock v-for="(com, index) in DisplayComs"  :key="index" :com="com"></CommentsBlock>

      <div class="add">
        <label for="post">Add a comment</label>
        <textarea id="com" name="post" ref="com"></textarea>
        <button v-on:click="addCom()" >Add</button>
      </div>

    </div>

  </div>

</template> 

<script>
import NavBlock from '@/components/NavBlock.vue'
import PostBlock from '@/components/PostBlock.vue'
import CommentsBlock from '@/components/CommentsBlock.vue'

export default {
  name: 'PostView',
  components: {
    NavBlock,
    PostBlock,
    CommentsBlock
  },

    mounted() {

    if (atob(localStorage.getItem('id'))) {
      this.$store.dispatch('getUsers')
    }

    this.$store.dispatch('getPost', this.$route.params.id)
    this.$store.dispatch('getComs', this.$route.params.id)
  },

  computed: {
    DisplayComs() {
      if (this.$store.getters.getComsHidden == true) {
         return this.$store.getters.getComs.filter(coms => coms.hide == false)
      }
      else {
        return this.$store.getters.getComs
      }
    }
  },

  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    },

    toggleComHidden(value) {
      this.$store.dispatch('setComsHidden', value)
    },

    addCom() {
      this.$store.dispatch('postCom', {post_id: this.$route.params.id, content:this.$refs.com.value, hide: false})
      document.getElementById("com").value = "";
    },
  },



}
</script>


<style lang="scss" scoped>

@import '@/scss/base';

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container  {
  max-width: 800px;
  text-align: left;
  font: 100% $font-stack;
  font-weight: 300;
  font-size: 12px;
  padding: 25px;
  border-radius: 20px;
  background-color: var(--white);
  overflow: hidden;
  width: 53%;
}

.header {
  margin-bottom: 20px;

  .title {
    font-size: 24px;
    color: var(--textBlack);
  }

  .btn {
    position: relative;
    top: -3px;
    margin-left: 15px;
    padding: 5px 15px;
    border-radius: 10px;
    border: 1px solid var(--green1);
    font-size: 10px;
    font-weight: 300;
    background-color: var(--white);
    color: var(--textBlack);
  }

  .btn:hover {
    background-color: var(--green3);
    border-color: var(--green3);
    color: var(--white);
  }
}

.add {
  margin-top: 40px;
  padding: 20px 30px;
  border-top: solid 1px var(--grey1) ;

  label {
    display: block;
    padding: 0 0 5px 10px;
  }

  textarea {
    display: block;
    width: 600px;
    max-width: 600px;
    min-height: 50px;
    max-height: 150px;
    padding: 10px;
    border: solid 1px var(--green3);
    border-radius: 10px;
    font-size: 12px ;
  }

  textarea:focus {
    outline: solid 1.5px var(--green3);
  }

  button {
    margin-top: 10px;
    border: none;
    padding: 5px 15px;
    border-radius: 7px;
    background-color: var(--green1);
    font-weight: 300;
  }

  button:hover {
    background-color: var(--green3);
    color: var(--white);
  }

}

</style>