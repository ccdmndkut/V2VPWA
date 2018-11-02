<template>
  <v-app>
    <template>
      <login @fire="fire" v-if="this.locked == true"></login>
      <template v-if="!this.locked">

        <info v-if="info" v-bind:clientDataFile.sync="clientDataFile" v-bind:info.sync="info"></info>

        <template v-if="!info">
          <mymenu v-bind:isMobileDevice="isMobileDevice" @logout="logout" @newNote="newNote" @changeDateToday="date = today, query='', clientToggle=false" :date='date' @changeDateYest="changeDate" @sentquery="makequery" :query='query' :names='names' :customFilter='customFilter' v-if="!editToggle && !newToggle "></mymenu>

          <newnote @submitNew="submitNew" @editToggleFunc='editToggleFunc' :noteNew='noteNew' :types='types' :names='names' v-if="newToggle"></newnote>

          <editnote @submitEdit="submitEdit" @editToggleFunc='editToggleFunc' :noteEdit='noteEdit' :types='types' v-if="editToggle"></editnote>

          <v-content>
            <v-container class='mt-3' fluid fill-height>
              <v-flex xs12 md10 offset-md1 lg8 offset-lg2>
                <transition-group name="staggered-fade" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave"> <template v-if="!query.length && !editToggle && !newToggle && !clientToggle">
                    <list v-bind:class="{list: !isMobileDevice}" v-for="(item, index) in dateFunc" v-bind:info.sync="info" @clientInfo="clientInfo" @priorityUp='priorityUp' @deleteNote='deleteNote' @completedCheck="completedCheck" @editNote='editNote' @senttoggleClient="toggleClient" @pullNote="pullNote" v-bind:item="item" v-bind:index="index" v-bind:isMobileDevice="isMobileDevice" :key="item['.key']"></list>
                  </template>
                </transition-group>

                <transition-group name="staggered-fade" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                  <template v-if="clientToggle && !query.length && !editToggle && !newToggle ">
                    <list v-bind:class="{list: !isMobileDevice}" v-for="(item, index) in clientFunc" v-bind:info.sync="info" @clientInfo="clientInfo" @priorityUp='priorityUp' @deleteNote='deleteNote' @completedCheck="completedCheck" @editNote='editNote' @senttoggleClient="toggleClient" @pullNote="pullNote" v-bind:item="item" v-bind:index="index" v-bind:isMobileDevice="isMobileDevice" :key="item['.key']"></list>
                  </template>
                </transition-group>

                <transition-group name="staggered-fade" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                  <template v-if="query.length && !editToggle && !newToggle && !clientToggle">
                    <list v-bind:class="{list: !isMobileDevice}" v-for="(item, index) in searchFunc" v-bind:info.sync="info" @clientInfo="clientInfo" @priorityUp='priorityUp' @deleteNote='deleteNote' @completedCheck="completedCheck" @editNote='editNote' @senttoggleClient="toggleClient" @pullNote="pullNote" v-bind:item="item" v-bind:index="index" v-bind:isMobileDevice="isMobileDevice" :key="item['.key']"></list>
                  </template>
                </transition-group>

              </v-flex>
              <v-btn @click="betachanger" round small flat color="grey" class='ver'>stable 10/17</v-btn>

            </v-container>
          </v-content>
        </template>

      </template>
      <!-- </v-flex>
      </v-layout>
    </v-container> -->
    </template>

  </v-app>
</template>

<script>
import firebase from "firebase";
import firestore from "./components/firebaseInit";
import Vue from "vue";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
Vue.use(VueFirestore);
import beta from "./components/beta";
import login from "./components/login";
import newnote from "./components/newnote";
import editnote from "./components/editnote";
import list from "./components/list";
import mymenu from "./components/mymenu";
import info from "./components/info";
var moment = require("moment");
export default {
  name: "App",
  components: {
    login,
    newnote,
    mymenu,
    editnote,
    list,
    info,
    beta
  },
  data() {
    return {
      beta: false,
      nameSearched: {
        name: String
      },
      clientDataFile: "",
      info: false,
      unique: [],
      user: String,
      password: {
        type: String,
        pass: ""
      },
      locked: true,
      menu: false,
      clientToggle: false,
      clientToggleName: "",
      newToggle: false,
      editToggle: false,
      editKey: "",
      taskCats: [
        "!URGENT",
        "To Do",
        "Respond",
        "Contact",
        "Follow Up",
        "In/Out",
        "Completed"
      ],
      noteEdit: [
        {
          name: "",
          date: "",
          notes: "",
          type: "",
          priority: ""
        }
      ],
      noteNew: {
        name: "",
        date: "",
        notes: "",
        type: "",
        priority: "",
        switch1: false
      },
      today: moment().format("YYYY-MM-DD"),
      date: moment().format("YYYY-MM-DD"),
      hasSaved: false,
      isEditing: null,
      model: null,
      query: "",
      typeGroup: [],
      items: [],
      number: Number,
      newCounter: 1,
      counter: 0,
      items2: [
        {
          icon: "contacts",
          text: "Contacts"
        },
        {
          icon: "history",
          text: "Frequently contacted"
        },
        {
          icon: "content_copy",
          text: "Duplicates"
        }
      ]
    };
  },
  firestore() {
    if (this.email == "chriscombs@vaclaims.net") {
      return {
        db: firestore.collection("tasks"),
        client: firestore.collection("clients"),
        trash: firestore.collection("trash"),
        denver: firestore.collection("denver")
      };
    }
    if (this.email == "denvercombs@vaclaims.net") {
      return {
        db: firestore.collection("denver"),
        client: firestore.collection("clients"),
        trash: firestore.collection("trash"),
        denver: firestore.collection("tasks")
      };
    }

    // return {
    //   db: firestore.collection("tasks"),
    //   trash: firestore.collection("trash"),
    //   denver: firestore.collection("denver")
    // };
  },

  computed: {
    isMobileDevice() {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
      );
    },
    mobilecheck() {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return { mobile: true };
      } else {
        return { mobile: false };
      }
    },
    email: function() {
      return window.sessionStorage.getItem("emailForSignIn");
    },
    groupBy: function() {
      var self = this;
      var objectArray = self.db;
      var property = "type";
      return objectArray.reduce(function(acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    },

    // LIST OF TYPES

    types: function() {
      var array = this.db;
      const unique = [...new Set(array.map(item => item.type))];
      var mapped = unique.map(item => ({
        key: item,
        type: item
      }));
      mapped.sort(this.compare);
      return mapped;
    },

    // LIST OF NAMES

    names: function() {
      var array = this.db;
      const unique = [...new Set(array.map(item => item.name))];
      var mapped = unique.map(item => ({
        key: item,
        name: item
      }));
      mapped.sort(this.compare);
      return mapped;
      // return unique.sort();
    },

    // FILTERED BY NAME LIST
    infoData() {
      const result = this.client.filter(
        client => client.name === this.nameSearched.name
      );

      return result;
    },
    clientFunc() {
      const result = this.db.filter(
        client => client.name === this.clientToggleName
      );
      result.sort(this.compareD);
      return result;
    },
    searchFunc() {
      const result = this.db.filter(client => client.name === this.query);
      result.sort(this.compareD);
      return result;
    },

    // FILTERED BY DATE BUTTON

    dateFunc() {
      const result = this.db.filter(client => client.date === this.date);
      result.sort(this.compareP);
      return result;
    }
    // VIEW CURRENT CLIENT
  },
  watch: {
    query: function() {
      this.clientToggle = false;
      console.log(this.clientToggle);
    }
  },
  // METHODS
  methods: {
    betachanger: function() {
      // this.beta = !this.beta;
      window.location.replace("https://v2vbeta.netlify.com/");
    },
    clientInfo(item) {
      var self = this;
      this.nameSearched.name = item.name;
      const result = this.client.filter(
        client => client.name === this.nameSearched.name
      );
      this.clientDataFile = result;
      if (this.clientDataFile.length > 0) {
        this.info = !this.info;
        console.log(this.clientDataFile);
      } else {
        self.$firestore.client.add(this.nameSearched);
        alert(
          this.nameSearched.name + " added to database, please click again."
        );
      }
    },
    lock() {
      this.locked = true;
    },
    logout() {
      let emailaddress = window.sessionStorage.getItem("emailForSignIn");
      let t = window.sessionStorage.getItem("logintime");
      window.sessionStorage.removeItem("emailForSignIn");
      this.locked = true;
      firebase
        .auth()
        .signOut()
        .then(
          user => {
            window.location.reload();
            // alert("logged in at" + " " + t);
          },
          err => {
            alert(err.message);
          }
        );
    },

    fire(i) {
      this.locked = false;
      this.user = i;
    },
    makequery(sentquery) {
      this.query = sentquery;
    },

    deleteNote: function(item) {
      this.$firestore.trash.add(item);
      this.$firestore.db.doc(item[".key"]).delete();
    },

    // TOGGLE

    toggleClient: function(item) {
      this.clientToggle = true;
      this.clientToggleName = item;
    },
    editToggleFunc: function() {
      this.editToggle = false;
      this.newToggle = false;
      this.noteNew = {
        name: String,
        date: "",
        notes: "",
        type: String,
        priority: "",
        switch1: Boolean
      };
    },

    // ADD AND EDIT

    // ADD

    newNote: function() {
      this.newToggle = true;
      this.noteNew = {
        name: String,
        date: moment().format("YYYY-MM-DD"),
        notes: "",
        type: String,
        priority: ""
      };
    },

    // EDIT

    editNote: function(item) {
      this.editKey = item[".key"];
      this.editToggle = true;
      this.noteEdit = {
        date: item.date,
        type: item.type,
        priority: item.priority,
        notes: item.notes,
        name: item.name
      };
    },

    // CHANGE DB

    priorityUp: function(item, n) {
      var note = this.noteEdit;
      note = {
        date: item.date,
        type: item.type,
        priority: item.priority,
        notes: item.notes,
        name: item.name
      };
      this.editKey = item[".key"];
      var key = this.editKey;
      var ps = note.priority;
      if (isNaN(ps) || ps == null) {
        note.priority = 1;
        var pnf = parseInt(note.priority);
        note.priority = pnf;
        this.$firestore.db.doc(key).update(note);
      } else {
        var pn = parseInt(ps, 10);
        var newP = pn + n;
        note.priority = newP;
        this.$firestore.db.doc(key).update(note);
      }
    },
    completedCheck: function(item) {
      this.editKey = item[".key"];
      var key = this.editKey;
      this.noteEdit = {
        date: item.date,
        type: item.type,
        priority: item.priority,
        notes: item.notes,
        name: item.name
      };
      this.noteEdit.priority = 101;
      this.noteEdit.type = "Completed";
      this.$firestore.db.doc(key).update(this.noteEdit);
    },
    submitInfo: function(sectionOne) {
      var key = this.clientDataFile[0][".key"];
      this.$firestore.client.doc(key).update(sectionOne);
      console.log("submitted");
    },
    submitEdit: function() {
      this.editToggle = false;
      var key = this.editKey;
      if (this.noteEdit.type == "Contact") {
        this.noteEdit.priority = 100;
      } else if (this.noteEdit.type == "Completed") {
        this.noteEdit.priority = 101;
      } else if (this.noteEdit.type == "!URGENT") {
        this.noteEdit.priority = 1;
      } else if (this.noteEdit.type == null) {
        this.noteEdit.priority = 5;
      }
      this.$firestore.db.doc(key).update(this.noteEdit);
    },
    submitNew: function() {
      if (this.noteNew.switch1 == true) {
        this.$firestore.denver.add(this.noteNew);
      }
      this.$firestore.db.add(this.noteNew);
      this.newToggle = false;
    },

    // CHANGE DATE OF NOTE

    pullNote: function(item, i) {
      var today = moment()
        .add(i, "d")
        .format("YYYY-MM-DD");
      this.$firestore.db.doc(item[".key"]).update({
        date: today
      });
    },

    // DATE CHANGER BY BUTTON

    changeDate: function(i) {
      this.query = "";
      this.clientToggle = false;
      var currD = this.date;
      var newD = moment(currD)
        .add(i, "d")
        .format("YYYY-MM-DD");
      this.date = newD;
    },

    // SORT NAMES

    compare: function(a, b) {
      const nameA = a.name;
      const nameB = b.name;

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    },

    // SORT DATE

    compareD: function(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a.date;
      const nameB = b.date;

      let comparison = 0;
      if (nameA > nameB) {
        comparison = -1;
      } else if (nameA < nameB) {
        comparison = 1;
      }
      return comparison;
    },

    // SORT PRIORITY

    compareP: function(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a.priority;
      const nameB = b.priority;

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    },

    // NAMES LIST FILER

    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },

    // ANIMATE

    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      var delay = 1 * 0;
      setTimeout(function() {
        Velocity(
          el,
          {
            opacity: 1
          },
          {
            complete: done
          }
        );
      }, delay);
    },
    leave: function(el, done) {
      var delay = 1 * 0;
      setTimeout(function() {
        Velocity(
          el,
          {
            opacity: 0
          },
          {
            complete: done
          }
        );
      }, delay);
    }
  },
  props: {
    source: String
  }
};
</script>
<style>
.v-btn.ver {
  bottom: 5px;
  right: 5px;
  position: absolute;
  color: whitesmoke;
  font-size: 10px;
}

nav.menu {
  min-width: 700px;
}
.list {
  min-width: 700px;
}
</style>
