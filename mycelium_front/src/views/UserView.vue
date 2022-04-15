<template class="window">
  <NavBlock></NavBlock>
<div class="container"  v-if="this.$store.getters.getFound">
  <div class="top">
    <div  class=" profil boxShadow leftElement">
        <profileBlock :infos="infos" :postNbr="Object.keys(DisplayPosts).length" :comNbr="Object.keys(DisplayComs).length"/>
    </div>
  <div class="add boxShadow rightElement">
    <h3>Contribute to mycellium</h3>
    <router-link class="myBtn" to="/newPost">add</router-link>
  </div>
  </div>
  <div class="bottom">
    <div class="postList boxShadow leftElement">
      <PostBlock v-for="(post, index) in DisplayPosts"  :key="index" :post="post" @click="location.href=`./post/${post.id}`"/>
    </div>
    <div class="commentsList boxShadow rightElement">
      <h3>Comments</h3>
      <CommentsBlock v-for="(com, index) in DisplayComs"  :key="index" :com="com"/>
    </div>
  </div>
</div>
</template>

<script>
import NavBlock from "@/components/profilNavBlock.vue";
import PostBlock from "@/components/PostBlock.vue";
import profileBlock from "@/components/profileBlock.vue";
import CommentsBlock from "@/components/simpleCommentBlock.vue";
export default {
  name: "UserView",
  components: { NavBlock,
  profileBlock,
  PostBlock, CommentsBlock },
  data(){
    console.log(this.$route.params.id);
this.$store.dispatch('getUser',this.$route.params.id);
this.$store.dispatch('getUserPost',this.$route.params.id);
this.$store.dispatch('getUserCom',this.$route.params.id);
// this.$store.dispatch('getUserCom');
return {
  get:false,
}
  },
  computed:{
    DisplayPosts() {
      return this.$store.getters.getAllPosts
    },
    DisplayComs() {
      return this.$store.getters.getComs
    },
      infos(){
          return this.$store.getters.getProfile;
      }
    },
};
</script>

<style scoped>
.container{
display: flex;
flex-direction: column;
margin: 10px 10px;
}
.profil{
  display: flex;
}
.add{
  margin-left: auto;
}
.add h3{
  margin-bottom:30px;
}
.myBtn{
  padding: 3px 50px;
  color:black;
  background: #B5CA8D;
border-radius: 10px;
}
.boxShadow{
  padding: 10px;
box-shadow: 0px 4px 4px rgba(42, 72, 73, 0.25);
border-radius: 0px 0px 20px 20px;
}
.top{
  display: flex;
  margin: 51px 62px;
}
.bottom{
  margin: 51px 62px;
  display: flex;
  flex-direction: row;
}
.leftElement{
  width: 64vw;
  flex-grow: 2;
  margin-right: 52px;
}
.rightElement{
  margin-left: auto;
  height: fit-content;
  width: 300px;

}
.postList{
  display: flex;
  flex-direction: column;
  
}
.commentsList{
  display: flex;
  flex-direction: column;
border-top: 5px solid #B5CA8D;
}
</style>
