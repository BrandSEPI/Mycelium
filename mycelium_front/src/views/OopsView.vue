<template>

<div class="body">

  <div class="container"> 
    <div class="content">
      <div class="title"> 404 <br> LOST IN MYCELIUM </div>  
      <router-link to="/" class="button">HOME</router-link>
    </div>
      <!-- <div class="image"> -->
      <img src= "../assets/mushroomError.png">
      <!-- </div> -->
  </div>

</div>
</template>

<script>

export default {
  name: 'OopsView',
}
</script>

<style scoped> 
.body {
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: #2a4849;
}

.button{
  margin-left: 20px ;
  padding: 10px 20px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #8bb174;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  text-decoration:none;
  color: white;
}
.button:hover{
background-color : #2a4849; 
}
.content{
 font-weight : 500;
 padding: 50px;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 justify-content: center;
}
.container{
  overflow: hidden;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  margin: 200px;
  /* padding: 100px; */
  /* height: 300px; */
  border-radius: 10px;
}
.title{
  padding: 20px;
  margin-top: -50px;
  text-align: left;
  font-size: 32px;
}

img {
  width: 500px;
  height: 500px;
}
</style>