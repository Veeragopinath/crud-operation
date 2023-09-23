<template>
  <v-card class="mainPage outlined mx-3 px-4">
    <v-row class="px-3 py-2">
      <v-col class="font-weight-bold heading-4"> Users </v-col>
      <v-spacer> </v-spacer>
      <v-btn   class="crudButtonPrimary white--text px-3 py-1" @click="userAddMode = true"
    
        >Create User</v-btn
      >
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-3">
      <v-col md="5">
        <v-text-field
          v-model="search"
          label="search by text"
          outlined
          dense
          hint="Search by Name, Surname, email, username, phonenumber"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-combobox
        v-model="search"
          outlined
          dense
          label="Select Role"
          :items="userRoles"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-sheet outlined class="mt-1">
      <v-data-table
        :headers="listOfHeaders"
        :items="listOfUsers"
        fixed-header
        :search="search"
        hide-default-footer
        :items-per-page="itemsPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
      >
        
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-btn  class="crudButtonPrimary px-3 py-0 mr-2" @click="editUser(item)">
              Edit
            </v-btn>
            <v-btn  color="grey" class="px-3 py-0" @click="deleteUserDialog(item)">
              Delete
            </v-btn>
          </div>
        </template></v-data-table
      ></v-sheet
    >
    <div class="pt-1 pb-1">
      <v-pagination
        class="mt-2 mb-2"
        v-model="page"
        
        :length="pageCount"
      >
      </v-pagination>
    </div>
    <v-dialog
      v-if="userAddMode"
      v-model="userAddMode"
      persistent
      max-width="600"
      :retain-focus="false"
      ><add-user @submitForm="addUser" @cancel="userAddMode = false"></add-user
    ></v-dialog>
    <delete-dialog
      :show="deleteDialog"
      :userName="userName"
      @agree="deleteUser"
      @close="deleteDialog = false"
    ></delete-dialog>
  </v-card>
</template>

<script>
import {mapGetters, mapState, mapActions } from "vuex";
import { Headers } from "~/helpers/tableHeaders.js";
import addUser from "~/components/addUser.vue";
import DeleteDialog from "~/components/deleteDialog.vue";
export default {
  components: { addUser, DeleteDialog },
  
  data() {
    return {
      
      
      search: "",
      pageCount: 3,
      userAddMode: false,
      deleteDialog: false,
      userName: "",
      itemsPerPage: 5,
      page: 1,
      userRoles: ["Admin", "User","guest"],
    };
  },
  computed: {
    ...mapGetters(['userRole']),
    ...mapState({
      listOfUsers: (state) => state.listOfUsers,
     
    }),
    
      listOfHeaders(){
       if(this.userRole === 'Admin'){
          return Headers
       }
       else{
        return Headers.filter(obj => obj.value !== 'password');
       }
    }
  },
  mounted() {
    this.initialise();
  },
  methods: {
    ...mapActions(["getUsersList", "createUser", "removeUser"]),
    initialise() {
      this.getUsersList();
     
    },
    addUser(user) {
      this.createUser(user);
     
      this.userAddMode = false;
    },

    editUser(item) {
      this.$router.push({
        path: "/editUser",
        query: { id: item.id },
      });
    },

    deleteUserDialog(item) {
      this.userName = item.name;
      this.deleteDialog = true;
      this.userToBeDeletedId = item.id;
    },
    deleteUser() {
      this.removeUser(this.userToBeDeletedId)
      
      .then((res) => {
        this.userToBeDeletedId = "";
        this.deleteDialog = false;
      
      });
    },
  },
};
</script>

<style>
.mainPage {
  background-color: #ffffff;
}
.crudButtonPrimary {
  background-color:#3f51b5 !important;
  color: #ffffff !important;
}
</style>
