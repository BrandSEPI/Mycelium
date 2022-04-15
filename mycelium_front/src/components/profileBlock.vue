<template class="profileBox">
<div class="profilImg">
    <img class="profilPic" src="../assets/user.png" alt="profilePicture">
    <!-- v-if="this.$router.params.id==localStorage.getItem('id')"  -->
</div>
<div class="edit" v-if="this.edit">
    <input type="text" id="profileUsername" :placeholder="this.infos.username">
    <input type="text" id="profilePassword" placeholder="password">
    <input type="text" id="confirmPassword" placeholder="confirm password">
    <input type="text" id="profileEmail" :placeholder="this.infos.email">
    <input type="text" id="profilePhone" :placeholder="this.infos.phone">
<button @click="editUser" class="myBtn">edit</button>
</div>
<div class="info">
    <div class="username" v-if="!this.edit">
    <H2>{{this.infos.username}}</H2>
    <img v-if="this.$route.params.id==sessionId" @click="this.edit=true" class="editPic" src="../assets/edit.png" alt="edit">
    </div>
    <div class="stats" v-if="typeof this.infos.created_at!=undefined">
        <div class="created element">
        <span class="grey">Grown</span>
        <H3>{{this.infos.created_at.split('T')[0]}}</H3>
    </div>
    <div class="postNbr element">
        <span class="grey">Posts</span>
        <H3>{{this.postNbr}}</H3>

    </div>
    <div class="commentNbr element">
        <span class="grey">Comments</span>
        <H3>{{this.comNbr}}</H3>
    </div>
    </div>
</div>
<div class="badges">

</div>
</template>

<script>

export default {
  name: 'profileBlock',
  props:{
      infos:Object,
      postNbr:Number,
      comNbr:Number
  },
    data() {
        let sessionId = atob(localStorage.getItem('id'));
        return {
            edit:false,
            sessionId,
        }
  },
  methods: {
      editUser(){
          let user = {
          username:document.querySelector('#profileUsername').value,
          password:"",
          email:document.querySelector('#profileEmail').value,
          phone:document.querySelector('#profilePhone').value};
          let password = document.querySelector('#profilePassword').value;
          let cPassword = document.querySelector('#confirmPassword').value;
          if(password==cPassword){
              user.password=password;
          }
        this.$store.dispatch('editUser',user);
        this.edit=false;
      }
  },
  
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

.profileBox{
display: flex;
}
.info{
    width: 60%;
    margin: 0px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.profilPic{
    width: 60px;
    border-radius: 50%;
}
.editPic{
    height: 25px;
width: 25px;
display: none;
}
.edit{
    margin: 0px -50px 0px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.edit input{
    margin: 2px 0px;
    border-radius: 4px;
    border: 1px solid #B5CA8D;
}
#profilePic{
    border:none;
}
.myBtn{
    width: 50px;
  color:black;
  background: #B5CA8D;
border-radius: 10px;
border: none;
}

.username{
width: 100%;
justify-items: start;
}
.username h2{
    float: left;
}
.grey{
color: #B4B4B4;
}
.element{
    margin: 10px;
font-size: 10px;
}
.created{
    margin-left: -10px;
}
.stats{
    display: flex;
    flex-direction: row;
}

.info:hover .editPic {
display: block;
}
</style>
