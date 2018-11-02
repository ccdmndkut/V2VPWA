 <template>
    <v-dialog :value='info' fullscreen hide-overlay transition="dialog-bottom-transition">

        <!-- TOOLBAR -->

        <v-card>
            <v-toolbar class='mb-4' tabs dark color="vueblue">
                <v-btn icon dark @click="$emit('update:info', !info)">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title class='headline titlefix pb-0'>{{myinfo.name}} </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class='mr-4'>{{this.db.vafile}}</v-toolbar-title>

                <v-tabs v-model="model" slot="extension" class="ml-5" color="vueblue" dark slider-color="yellow">
                    <v-tab ripple>
                        {{tabs.tabOne}}
                    </v-tab>
                    <v-tab ripple>
                        {{tabs.tabTwo}}
                    </v-tab>
                </v-tabs>
            </v-toolbar>

            <!-- MAIN SECTION -->

            <v-tabs-items v-model="model">

                <!-- TAB1 -->

                <v-tab-item>
                    <v-container>
                        <v-layout justify-space-around="">
                            <v-flex xs12 sm8 lg6 xl5>
                                <v-card color="white" height="370">
                                    <v-card flat>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <v-toolbar height="45" dark dense color="vuegreendark">

                                                    <v-toolbar-title>
                                                        <v-icon class='pb-1'>home</v-icon> <span class="ml-2 ms-fontSize-xxl ms-fontWeight-semilight	"> {{sectionOne.title}}</span>
                                                    </v-toolbar-title>

                                                    <v-spacer></v-spacer>
                                                    <v-icon v-if="edit==false && editContact==false" right @click="edit=!edit">edit</v-icon>
                                                </v-toolbar>
                                            </v-flex>

                                        </v-layout>
                                        <template v-if="edit==true">
                                            <v-layout justify-start="" class="mb-0 pb-0 ">
                                                <v-flex class='ml-4 mb-0 pb-0 ' xs6>
                                                    <v-text-field v-model="clientObj.street" label="Street" :placeholder="this.db.street" type="text" single-line></v-text-field>
                                                </v-flex>
                                                <v-flex class='ml-5 mb-0 pb-0 ' xs2>
                                                    <v-text-field return-masked-value mask="### ## ####" v-model="clientObj.vafile" label="VA File Number" :placeholder="this.db.vafile" single-line></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout class='ml-4 pt-0 mt-0' row wrap>
                                                <v-flex xs3 class="mr-3">
                                                    <v-text-field v-model="clientObj.city" label="City" :placeholder="this.db.city" type="text" class='pt-0 mt-0' single-line></v-text-field>
                                                </v-flex>
                                                <v-flex xs1 class="mr-3 pt-0 mt-0">
                                                    <v-text-field v-model="clientObj.state" label="State" :placeholder="this.db.state" type="text" class='pt-0 mt-0' single-line></v-text-field>
                                                </v-flex>
                                                <v-flex xs2>
                                                    <v-text-field v-model="clientObj.zip" label="Zip" :placeholder="this.db.zip" type="text" class='pt-0 mt-0' single-line></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-btn class='my-3 ml-4' outline round @click="submitInfo(), edit=!edit" color="vueblue">Save</v-btn>
                                            <v-btn class='my-3' outline round @click="edit=!edit" color="vueblue">Cancel</v-btn>
                                        </template>

                                        <template v-if="edit==false && editContact==false">
                                            <v-list class="mt-3 mb-3" three-line subheader>
                                                <v-list-tile>
                                                    <v-list-tile-content class="title">
                                                        <v-list-tile-title class="ml-4">{{FirstName}} {{lastName}}</v-list-tile-title>
                                                        <v-list-tile-title class="ml-4">{{this.db.street}}</v-list-tile-title>
                                                        <v-list-tile-title class="ml-4">
                                                            <div>
                                                                {{this.db.city}}, {{this.db.state}} {{this.db.zip}}
                                                            </div>
                                                        </v-list-tile-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </template>

                                        <!-- CONTACT INFO -->

                                        <v-toolbar height="45" dark dense color="vuegreendark">
                                            <v-toolbar-title>
                                                <v-icon class='pb-1'>person</v-icon><span class="ml-2 ms-fontSize-xxl ms-fontWeight-semilight	"> {{sectionTwo.title}}</span>
                                            </v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-icon v-if="edit==false && editContact==false" right @click="editContact=!editContact">edit</v-icon>
                                        </v-toolbar>

                                        <template v-if="editContact==true">
                                            <v-layout justify-start class="mb-0 pb-0 ">
                                                <v-flex class='ml-4  mb-0 pb-0 mr-5' xs4>
                                                    <v-text-field return-masked-value mask="phone" prepend-icon="phone" v-model="clientObj.phoneMain" label="Phone Main" :placeholder="this.db.phoneMain" single-line></v-text-field>
                                                </v-flex>
                                                <v-flex class='mr-5 mb-0 pb-0 ' xs4>
                                                    <v-text-field return-masked-value mask="phone" prepend-icon="phone_iphone" v-model="clientObj.phoneSecondary" label="Phone Secondary" :placeholder="this.db.phoneSecondary" single-line></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout class='ml-4 pt-0 mt-0' row wrap>
                                                <v-flex xs8 class="mr-3">
                                                    <v-text-field prepend-icon="email" class='pt-0 mt-0' v-model="clientObj.email" label="Email" :placeholder="this.db.email" single-line></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-btn class='my-3 ml-4' outline round @click="submitInfo(), editContact=!editContact" color="vueblue">Save</v-btn>
                                            <v-btn class='my-3' outline round @click="editContact=!editContact" color="vueblue">Cancel</v-btn>
                                        </template>

                                        <template v-if="editContact==false && edit==false">
                                            <v-list class="mt-3 mb-3" three-line subheader>
                                                <v-list-tile>
                                                    <v-list-tile-content class="title">
                                                        <v-list-tile-title class="ml-4 mb-2 ">
                                                            <v-icon color="vueblue">phone</v-icon> : <span class="pl-3">{{this.db.phoneMain}}</span>
                                                        </v-list-tile-title>
                                                        <v-list-tile-title class="ml-4 mb-2">
                                                            <v-icon color="vueblue">phone_iphone</v-icon> : <span class="pl-3">{{this.db.phoneSecondary}}</span>
                                                        </v-list-tile-title>
                                                        <v-list-tile-title class="ml-4">
                                                            <v-icon color="vueblue">email</v-icon> : <span class="pl-3">{{this.db.email}}</span>
                                                        </v-list-tile-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </template>
                                    </v-card>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-tab-item>

                <!-- TAB2 -->

                <v-tab-item>
                    <v-container>
                        <v-layout justify-space-around="">
                            <v-flex xs12 sm10 lg8 x8>
                                <v-card color="white" height="70vh">
                                    <v-card flat>
                                        <v-toolbar height="45" dark dense color="vuegreendark">
                                            <v-toolbar-title>
                                                <v-icon>person</v-icon> <span class="ml-2">Disabilities</span>
                                            </v-toolbar-title>
                                        </v-toolbar>
                                        <v-layout class='mt-3' align-center row wrap>
                                            <v-flex xs3 offset-xs1>
                                                <v-text-field ref="dis" @keyup.enter="addDistwo" v-model="addadis" label="Add Disability"></v-text-field>
                                            </v-flex>
                                            <v-flex xs1 class="ml-5">
                                                <v-text-field @keyup.enter="addDistwo" v-model="addarate" label="Rating %"></v-text-field>
                                            </v-flex>
                                            <v-flex xs2 offset-xs1>
                                                <v-btn @click="addDistwo" color="vueblue" small dark round>Add</v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout justify-space-around row wrap>
                                            <v-flex text-xs-center xs3>
                                                <v-card-text class="header title">
                                                    Disability
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex text-xs-center xs3>
                                                <v-card-text class="header title">
                                                    Rating
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex text-xs-center xs3>
                                                <v-card-text class="header title">
                                                    Remaining
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex text-xs-center xs3>
                                                <v-card-text class="header title">
                                                    Combined
                                                </v-card-text>
                                            </v-flex>

                                        </v-layout>

                                        <template v-for="(i, index) in dis">
                                            <v-layout align-center="" justify-space-around row wrap :key="i.index">
                                                <v-flex text-xs-center xs3>
                                                    <v-card-text class="dheader subheading">
                                                        <v-icon align-center class="trashclass" @click="deletedis(index)">delete</v-icon>
                                                        {{dis[index].disabiilty}}
                                                    </v-card-text>
                                                </v-flex>
                                                <v-flex text-xs-center xs3>
                                                    <v-card-text class="dheader subheading">
                                                        {{dis[index].rate}}
                                                    </v-card-text>
                                                </v-flex>
                                                <v-flex text-xs-center xs3>
                                                    <v-card-text class="dheader subheading">
                                                        Remaining
                                                    </v-card-text>
                                                </v-flex>
                                                <v-flex text-xs-center xs3>
                                                    <v-card-text class="dheader subheading">
                                                        Combined
                                                    </v-card-text>
                                                </v-flex>
                                            </v-layout>
                                        </template>

                                    </v-card>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-tab-item>

            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>
               
<script>
import firebase from "firebase";
import firestore from "./firebaseInit";
import Vue from "vue";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
Vue.use(VueFirestore);
export default {
  name: "info",

  data() {
    return {
      addadis: "",
      addarate: "",
      dis: [],
      discount: 0,
      editfilenum: false,
      sectionOne: {
        title: "Address",
        street: "",
        state: "",
        city: "",
        zip: ""
      },
      sectionTwo: {
        title: "Contact Info",
        phoneMain: "",
        phoneSecondary: "",
        email: ""
      },
      model: "tab-2",
      tabs: {
        tabOne: "Client Info",
        tabTwo: "Claim Info"
      },
      edit: false,
      editContact: false,
      active: null
    };
  },

  computed: {
    clientInfo() {
      return this.clientDataFile[0][".key"];
    },
    clientObj() {
      return {};
    },
    myinfo() {
      if (this.clientDataFile.length > 0) {
        return this.clientDataFile[0];
      } else {
        console.warn("empty");
      }
    },
    mykey() {
      return this.clientDataFile[0][".key"];
    },
    lastName() {
      let fullname = this.myinfo.name;
      let index = fullname.indexOf(",");
      var last = fullname.slice(0, index);
      return last;
    },
    FirstName() {
      let fullname = this.myinfo.name;
      let index = fullname.indexOf(",") + 2;
      var first = fullname.slice(index);
      return first;
    },
    city() {
      let city = this.clientDataFile[0].city;
      return city;
    }
  },
  methods: {
    deletedis: function(index) {
      this.dis.splice(index, 1);
      console.log(index);
    },
    addDistwo: function() {
      let mynum = this.dis.length;
      let myDisObjKey = "disability" + mynum;

      let disabiilty = this.addadis;
      let rate = this.addarate;
      let obj = { myDisObjKey: { myDisObjKey: disabiilty, rate: rate } };
      this.dis.push(obj);
      this.addadis = "";
      this.addarate = "";
      console.log(mynum);
      //   this.$firestore.clientdb.doc(this.mykey).update(this.dis);
    },
    addDis: function() {
      this.discount += 1;
      console.log(this.discount);
    },
    submitInfo: function() {
      console.log(this.clientObj);

      this.$firestore.clientdb.doc(this.mykey).update(this.clientObj);
    },
    test() {
      alert(this.FirstName);
    }
  },
  props: ["info", "clientDataFile"],
  firestore() {
    var key = this.clientInfo;
    return {
      clientdb: firestore.collection("clients"),
      db: firestore.collection("clients").doc(key)
    };
  }
};
</script>

<style>
.trashclass {
  position: absolute;
  left: 10px;
  padding: -10px;
  margin-bottom: -2px;
}
.dheader {
  color: black;
  border-bottom: 1px solid #c0bdc5;
  padding: 15px;
}
.header {
  color: black;
  border-bottom: 1px solid #c0bdc5;
  border-top: 1px solid #c0bdc5;
  padding: 10px;
}

.mycol {
  padding: 15px;
  padding-left: 5%;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 20vw;
}
.myclass {
  position: relative;
  top: -8px;
  margin-left: 25%;
  color: lightgray;
  text-decoration: underline;
  text-decoration-line: overline;
  text-decoration-color: white;
}
.titlefix {
  text-overflow: unset;
  overflow: unset;
}
</style>
