<template>
  <AdminNavBlock></AdminNavBlock>
  <table>
    <thead>
      <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Created at</th>
          <th>Admin</th>
          <th colspan="2"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in this.$store.getters.getAllUsers" :key="index">
          <td>{{ user.id }}</td>
          <td v-if="this.edit==user.id"><input id="userUsername" type="text" :value="user.username"></td>
          <td v-if="this.edit!=user.id">{{ user.username }}</td>
          <td v-if="this.edit==user.id"><input id="userPhone" type="text" :value="user.phone"></td>
          <td v-if="this.edit!=user.id">{{ user.phone }}</td>
          <td v-if="this.edit==user.id"><input id="userEmail" type="text" :value="user.email"></td>
          <td v-if="this.edit!=user.id">{{ user.email }}</td>
          <td>
            {{ user.created_at.replace("T", " - ").slice(0, 21) }}
            </td>
          <td v-if="this.edit!=user.id">{{ user.admin }}</td>
          <td v-if="this.edit==user.id" class="radio">
            <input type="radio" name="isAdmin" id="true" value="1" :checked="user.admin==1">
          <label for="true" >true</label>
            <input type="radio" name="isAdmin" id="false" value="0" :checked="user.admin==0">
          <label for="true" >false</label>
          </td>
          <td v-if="this.edit!=user.id"><button class="edit" @click="this.edit=user.id">Edit</button></td>
          <td v-if="this.edit==user.id" ><button class="edit editing" v-on:click="editUser(user.id,user.email)">✓</button></td>
          <td v-if="this.edit!=user.id"><button class="delete" v-on:click="del(user.id)">Delete</button></td>
          <td v-if="this.edit==user.id" ><button class="delete editing" v-on:click="this.edit=false">X</button></td>
        
      </tr>
    </tbody>
  </table>
</template>

<script>
import AdminNavBlock from "@/components/AdminNavBlock.vue";

export default {
  name: "AdminUserView",
  components: {
    AdminNavBlock,
  },
  data() {
            console.log(this.$store.getters.getAllUsers)

    return {
      edit: false,
    };
  },
  methods: {
    del(user_id) {
      this.$store.dispatch("deleteUser", user_id);
    },
    editUser(userId,userEmail){
          let user = {id:userId,
          username:document.querySelector('#userUsername').value,
          email:"",
          phone:document.querySelector('#userPhone').value,
          admin:document.querySelector('input[name="isAdmin"]:checked').value
          };
if (userEmail!=document.querySelector('#userEmail').value) {
           user.email = document.querySelector('#userEmail').value

}        
this.$store.dispatch('editUser',user);
        this.edit=false;
      }
  },

  created() {
    if (this.$store.getters.isAdmin == false) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/base";

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
  box-shadow: inset 3px 0px 0px 0px var(--green3);
  background-color: transparent;
  color: var(--textBlack);
}

tbody tr:hover button {
  visibility: visible;
}

th,
td {
  padding: 10px 15px;
  max-width: 200px;
  overflow: scroll;
}

td:nth-child(n + 7) {
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
.radio{
  display: flex;
}
.editing{
  padding: 10px;
width: 40px;
}
.radio input{
  width: 20px;
}

</style>
