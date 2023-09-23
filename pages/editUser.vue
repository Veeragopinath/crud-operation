<template>
  <div>
    <v-form id="addIssueForm" ref="form">
      <v-card class="pa-6">
        <v-card-title class="text-h5 font-weight-bold">EDIT USER</v-card-title>
        <v-divider></v-divider>
        <v-row class="mt-2">
          <v-col md="6">
            <v-text-field
              v-model="form.name"
              outlined
              dense
              :rules="[rules.required, rules.name]"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col md="6">
            <v-text-field
              v-model="form.password"
              outlined
              dense
              :rules="[rules.required, rules.name]"
              label="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
            <v-text-field
              v-model="form.e_mail"
              outlined
              dense
              :rules="[rules.required, rules.email]"
              label="E Mail"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="form.phone_no"
              outlined
              dense
              :rules="[rules.required, rules.mobile, rules.mobileLength]"
              label="phone Number"
            ></v-text-field>
          </v-col>
          <v-col md="6">
            <v-combobox
              :items="userRoles"
              outlined
              dense
              v-model="form.role"
              label="Role"
              :rules="[rules.required]"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-footer class="d-flex bg justify-end white">
          <v-btn
            class="mr-5 crudButtonPrimary white--text"
            depressed
            @click="editUser()"
            >Update</v-btn
          >
          <v-btn color="grey lighten-1" class="mr-5 white--text" depressed @click="cancel"
            >Cancel</v-btn
          >
        </v-footer>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "~/helpers/formValidation.js";
import addUser from "~/components/addUser.vue";
export default {
  auth:true,
  components: { addUser },
  data() {
    return {
      
      rules,
      form: {
        userId: this.$route.query.id,
      },
      userRoles: ["Admin", "User","guest"],
    };
  },

  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["updateUser","getUserById"]),
    initialize() {

      this.getUserById(this.form.userId)
      
      .then((res) => {
        this.form = { ...res};
      });
    },
    editUser() {

     this.updateUser( this.form)
      

        .then((res) => {
          this.$refs.form.reset();
          debugger
          this.$router.push("/Dashboard");
        });
    },
    cancel() {
      this.$refs.form.reset();
      this.$router.push("/Dashboard");
    },
  },
};
</script>

<style scoped></style>
