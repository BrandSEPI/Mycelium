<template>

  <AdminNavBlock></AdminNavBlock>
    <table>
      <thead>
          <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Title</th>
              <th>Link</th>
              <th>score</th>
              <th>Created at</th>
              <th colspan="2"></th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(post, index) in this.$store.getters.getAllPosts"  :key="index">
              <td>{{ post.id }}</td>
          <td>{{ post.username }}</td>
          <td v-if="this.edit==post.id"><input id="postTitle" type="text" :value="post.title"></td>
          <td v-if="this.edit!=post.id">{{ post.title }}</td>
          <td v-if="this.edit==post.id"><input id="postLink" type="text" :value="post.link"></td>
          <td v-if="this.edit!=post.id">{{ post.link }}</td>
          <td v-if="this.edit==post.id"><input id="postScore" type="text" :value="post.score"></td>
          <td v-if="this.edit!=post.id">{{ post.score }}</td>
          <td>
            {{ post.created_at.replace("T", " - ").slice(0, 21) }}
            </td>
          <td v-if="this.edit!=post.id"><button class="edit" @click="this.edit=post.id">Edit</button></td>
          <td v-if="this.edit==post.id" ><button class="edit editing" v-on:click="editPost(post.id)">✓</button></td>
          <td v-if="this.edit!=post.id"><button class="delete" v-on:click="del(post.id)">Delete</button></td>
          <td v-if="this.edit==post.id" ><button class="delete editing" v-on:click="this.edit=false">X</button></td>
        
          </tr>
          
      </tbody>
  </table>

  <br><br>

</template>

<script>
import AdminNavBlock from '@/components/AdminNavBlock.vue'

export default {
  name: 'AdminPostView',
  components: {
    AdminNavBlock,
  },
data(){
  return{
    edit:false
  }
},
  methods: {
    del(post_id) {
      this.$store.dispatch('deletePost', post_id)
    },
  editPost(postId){
  let  post = {id:postId,
  title:document.querySelector('#postTitle').value,
  link:document.querySelector('#postLink').value,
  score:document.querySelector('#postScore').value,

}
          console.log(post);
this.$store.dispatch('updatePost',post);
        this.edit=false;
      
  },
  },
  created() {
    this.$store.dispatch('getPosts', {limit:100, offset:0})

    if( this.$store.getters.isAdmin == false)
    {
      this.$router.push('/')   
    }
  }
  
}
</script>



<style lang="scss" scoped>

@import '@/scss/base';

table {
  width: 90%;
  margin: 50px auto;
  font: 100% $font-stack;
  text-align: left;
  font-weight: 300;
  font-size: 16px;
  border-spacing: 0px 3px;
}

thead {
  background-color: var(--green2);
  color: var(--white);
}

tbody {
  margin-bottom: 10px;
}

tbody tr {
  background-color: var(--white);
  color: var(--black);
  font-size: 14px;
}

tbody tr:hover {
  box-shadow:inset 3px 0px 0px 0px var(--green3);
  background-color: transparent;
  color: var(--textBlack);
}

tbody tr:hover button {
visibility: visible;
}

th,td {
  padding: 10px 15px;
  max-width: 175px;
}

td:nth-child(n+6) {
  text-align: right;
  max-width: 30px;
  min-width: 30px;
}

button {
  visibility: hidden;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  color: var(--white);
}
tr input{
  border: none;
  width: 90%;
}
.edit {
  background-color: var(--green3);
}

.edit:hover {
  background-color: var(--green4);
}

.delete {
  background-color: var(--red1);
}

.delete:hover {
  background-color: var(--red2);
}
.editing{
  padding: 10px;
width: 40px;
}

</style>