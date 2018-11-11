 <template>
    <v-dialog :value='info' fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-card>
            <v-toolbar tabs dark color="vueblue">
                <v-btn icon dark @click="$emit('update:info', !info)">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title class='headline titlefix'>{{myinfo.name}}</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-tabs v-model="model" slot="extension" class="ml-5" color="vueblue" dark slider-color="yellow">
                    <v-tab ripple>
                        {{tabs.tabOne}}
                    </v-tab>
                    <v-tab ripple>
                        {{tabs.tabTwo}}
                    </v-tab>
                </v-tabs>

            </v-toolbar>
            <v-tabs-items v-model="model">
                <v-tab-item>
                    <v-container>
                        <v-layout justify-space-around="">
                            <v-card color="white" width="50vw" height="410">

                                <v-card flat>

                                    <!-- ADDRESS -->

                                    <v-toolbar height="45" dark dense color="vuegreendark">
                                        <v-toolbar-title>
                                            <v-icon>home</v-icon> <span class="ml-2"> {{sectionOne.title}}</span>
                                        </v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-icon v-if="edit==false && editContact==false" right @click="edit=!edit">edit</v-icon>
                                    </v-toolbar>

                                    <template v-if="edit==true">
                                        <v-layout justify-start="" class="mb-0 pb-0 ">
                                            <v-flex class='ml-4 mb-0 pb-0 ' xs10>
                                                <!-- <v-text-field v-on:input="addressvalidate" v-model="clientObj.clientInfo.street" label="Street" :placeholder="this.db.clientInfo.street" type="text" single-line></v-text-field> -->
                                                <v-autocomplete class='mb-5' dense :search-input.sync="search" :items="suggestions" item-text="text"></v-autocomplete>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout class='ml-4 pt-0 mt-0' row wrap>
                                            <v-flex xs3 class="mr-3">
                                                <v-text-field v-model="clientObj.clientInfo.city" label="City" :placeholder="this.db.clientInfo.city" type="text" class='pt-0 mt-0' single-line></v-text-field>
                                            </v-flex>
                                            <v-flex xs1 class="mr-3 pt-0 mt-0">
                                                <v-text-field v-model="clientObj.clientInfo.state" label="State" :placeholder="this.db.clientInfo.state" type="text" class='pt-0 mt-0' single-line></v-text-field>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-text-field v-model="clientObj.clientInfo.zip" label="Zip" :placeholder="this.db.clientInfo.zip" type="text" class='pt-0 mt-0' single-line></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-btn class='my-3 ml-4' outline round @click="submitInfo(), edit=!edit" color="vueblue">Save</v-btn>
                                        <v-btn class='my-3' outline round @click="edit=!edit" color="vueblue">Cancel</v-btn>
                                    </template>

                                    <template v-if="edit==false">
                                        <v-list class="mt-3 mb-3" three-line subheader>
                                            <v-list-tile>
                                                <v-list-tile-content class="title">
                                                    <v-list-tile-title class="ml-4">{{FirstName}} {{lastName}}</v-list-tile-title>
                                                    <v-list-tile-title class="ml-4">{{this.db.clientInfo.street}}</v-list-tile-title>
                                                    <v-list-tile-title class="ml-4">
                                                        <div>
                                                            {{this.db.clientInfo.city}}, {{this.db.clientInfo.state}} {{this.db.clientInfo.zip}}
                                                        </div>
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </template>

                                    <!-- CONTACT INFO -->

                                    <v-toolbar height="45" dark dense color="vuegreendark">
                                        <v-toolbar-title> {{sectionTwo.title}}</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-icon v-if="edit==false && editContact==false" right @click="editContact=!editContact">edit</v-icon>
                                    </v-toolbar>

                                    <template v-if="editContact==true">
                                        <v-layout justify-start class="mb-0 pb-0 ">
                                            <v-flex class='ml-4  mb-0 pb-0 mr-5' xs4>
                                                <v-text-field v-model="clientObj.clientInfo.phoneMain" label="Phone Main" :placeholder="this.db.clientInfo.phoneMain" single-line></v-text-field>
                                            </v-flex>
                                            <v-flex class='mr-5 mb-0 pb-0 ' xs4>
                                                <v-text-field v-model="clientObj.clientInfo.phoneSecondary" label="Phone Secondary" :placeholder="this.db.clientInfo.phoneSecondary" single-line></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout class='ml-4 pt-0 mt-0' row wrap>
                                            <v-flex xs8 class="mr-3">
                                                <v-text-field class='pt-0 mt-0' v-model="clientObj.clientInfo.email" label="Email" :placeholder="this.db.clientInfo.email" single-line></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-btn class='my-3 ml-4' outline round @click="submitInfo(), editContact=!editContact" color="vueblue">Save</v-btn>
                                        <v-btn class='my-3' outline round @click="editContact=!editContact" color="vueblue">Cancel</v-btn>
                                    </template>

                                    <template v-if="editContact==false">
                                        <v-list class="mt-3 mb-3" three-line subheader>
                                            <v-list-tile>
                                                <v-list-tile-content class="title">
                                                    <v-list-tile-title class="ml-4 mb-2 ">
                                                        <v-icon color="vueblue">phone</v-icon> : {{this.db.clientInfo.phoneMain}}
                                                    </v-list-tile-title>
                                                    <v-list-tile-title class="ml-4 mb-2">
                                                        <v-icon color="vueblue">phone_iphone</v-icon> : {{this.db.clientInfo.phoneSecondary}}
                                                    </v-list-tile-title>
                                                    <v-list-tile-title class="ml-4">
                                                        <v-icon color="vueblue">email</v-icon> {{this.db.clientInfo.email}}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </template>
                                </v-card>
                            </v-card>
                        </v-layout>

                    </v-container>

                </v-tab-item>
                <v-tab-item v-for="tab in tabs" :key="tab.tabname">
                    <v-container>
                        <v-layout justify-space-around="">
                            <v-card color="white" width="50vw" height="70vh">
                                <template v-if="edit==false">
                                    <v-card flat>

                                    </v-card>

                                </template>
                                <template v-if="edit==false">
                                    <v-card-title primary-title class="my-0 pt-2 pb-0 mb-0 body-2">
                                        sectionOne
                                    </v-card-title>

                                    <v-btn @click="edit=!edit" color="success">Save</v-btn>
                                    <v-btn @click="test" color="success">dddd</v-btn>

                                </template>
                            </v-card>
                        </v-layout>

                    </v-container>

                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>
               
<script>
import axios from "axios";
import firebase from "firebase";
import firestore from "./firebaseInit";
import Vue from "vue";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
Vue.use(VueFirestore);
export default {
  name: "info",
  firestore() {
    var key = this.clientInfo;
    return {
      clientdb: firestore.collection("clients"),
      db: firestore.collection("clients").doc(key)
    };
  },
  data() {
    return {
      search: null,
      suggestions: {},
      sectionOne: {
        title: "Address"
      },
      sectionTwo: {
        title: "Contact Info"
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
  created() {
    console.warn("created testinginfo");
  },
  computed: {
    clientInfo() {
      return this.clientDataFile[0][".key"];
    },
    clientObj() {
      return {
        clientInfo: {
          street: this.db.clientInfo.street,
          city: this.db.clientInfo.city,
          state: this.db.clientInfo.state,
          zip: this.db.clientInfo.zip,
          phoneMain: this.db.clientInfo.phoneMain,
          phoneSecondary: this.db.clientInfo.phoneSecondary,
          email: this.db.clientInfo.email
        }
      };
    },
    predefine() {
      if (this.db.clientInfo.street == null)
        return {
          clientObj: {
            clientInfo: {
              street: "p",
              city: "p",
              state: "p",
              zip: "p",
              phoneMain: "p",
              phoneSecondary: "p",
              email: "p"
            }
          }
        };
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
  watch: {
    search(val) {
      if (val.length < 10) return;
      else {
        axios
          .get("https://us-autocomplete.api.smartystreets.com/suggest?", {
            params: {
              "auth-id": "21360857966935730",
              // "auth-token": "AUTH-TOKEN",
              prefix: val,
              prefer: "OH",
              suggestions: 1
            }
          })
          .then(response => {
            this.suggestions = response.data.suggestions;
            this.clientObj.clientInfo.city = response.data.suggestions[0].city;
            this.clientObj.clientInfo.street =
              response.data.suggestions[0].street_line;
            this.clientObj.clientInfo.state =
              response.data.suggestions[0].state;
            console.log(this.suggestions);
          });
      }
    }
  },

  methods: {
    // addressvalidate: function() {
    //   axios
    //     .get("https://us-autocomplete.api.smartystreets.com/suggest?", {
    //       params: {
    //         "auth-id": "21360857966935730",
    //         // "auth-token": "AUTH-TOKEN",
    //         prefix: this.clientObj.clientInfo.street,
    //         prefer: "OH",
    //         suggestions: 3
    //       }
    //     })
    //     .then(response => {
    //       this.suggestions = response.data.suggestions;
    //       console.log(this.suggestions);
    //     });
    // },
    submitInfo: function() {
      this.$firestore.clientdb.doc(this.mykey).update(this.clientObj);
      console.log(this.clientObj);
    },
    test() {
      alert(this.FirstName);
    }
  },
  props: ["info", "clientDataFile"]
};
</script>

<style>
]
.bartitle {
}
.titlefix {
  text-overflow: unset;
  overflow: unset;
}
</style>
