<template>

  <NavBlock></NavBlock>

  <div class="wrapper">

    <div class="containerLeft">
      <div class="searchBar">
        <div class="filter">
          Order by <span> | </span>
          <select @change="selectOrder($event)">
            <option  selected="selected" value="id">Last Published</option>
            <option  value="score">Most Seeds</option>
          </select>
        </div>

        <div class="filter">
          Page <span> | </span>
          <select @change="selectPage($event)">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>


      </div>

      <div class="posts">
        <PostBlock v-for="(post, index) in DisplayPosts"  :key="index" :post="post"></PostBlock>

      </div>
    </div>

    <div class="more">
      <AddPostBlock></AddPostBlock>
      <RewardBlock></RewardBlock>
      <MembersBlock></MembersBlock>
    </div>
  </div>

</template>

<script>
import NavBlock from '@/components/NavBlock.vue'
import PostBlock from '@/components/PostBlock.vue'
import AddPostBlock from '@/components/AddPostBlock.vue'
import RewardBlock from '@/components/RewardBlock.vue'
import MembersBlock from '@/components/MembersBlock.vue'


export default {
  name: 'HomeView',
  components: {
    NavBlock,
    PostBlock,
    AddPostBlock,
    RewardBlock,
    MembersBlock
  },

  async mounted() {
    if (atob(localStorage.getItem('id'))) {
      await this.$store.dispatch('getUsers')
    }
    await this.$store.dispatch('getPosts', {limit:100, offset:0})
  },

  computed: {
    DisplayPosts() {
      return this.$store.getters.getAllPosts
    }
  },

  methods: {
    selectOrder(event) {
      console.log(event.target.value);
    },

    selectPage(event) {
      this.$store.dispatch('getPosts', {limit:10, offset:(parseInt(event.target.value)-1)*10})
    }
  },

}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

.wrapper {
  display: flex;
  justify-content: space-around;
}

.containerLeft {
  padding-left: 20px;
}

.searchBar {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 7px 0;
  background-color: var(--green1);
  font-size: 12px;


  .filter {
    margin: 0px 7px;
    background-color: var(--white);
    max-width: 200px;
    padding: 7px 15px;
    border-radius: 7px;
    text-align: left;
    color: var(--textBlack);

    span {
      margin: 0 10px;
      color: var(--textGrey);
    }

    select {
      background-color: transparent;
      border: none;
      font-size: 12px;
      color: var(--textBlack);
    }

  }


}

.posts {
  border-radius: 20px;
  overflow: hidden;
  filter: drop-shadow(0px 4px 4px var(--shadowBlack));
  margin: 20px 0;


  .line {
  width: 500px;
  height: 1px;
  background-color: var(--grey1);
  margin: auto;
}

}

.more {
  width: 300px;
  // position: fixed;
}

</style>
