<template>
  <v-card class='mb-5'>
    <v-toolbar class='py-1' flat dense color="vuegreendark" dark>
      <v-flex v-if="isMobileDevice==false">
        <v-layout justify-start>
          <v-tooltip bottom>
            <v-btn slot="activator" class='mr-0' @click="$emit('pullNote', item, 0)" icon>
              <v-icon color="low">looks</v-icon>
            </v-btn>
            <span>Pull to today</span>
          </v-tooltip>

          <v-tooltip bottom>
            <div slot="activator">
              <v-btn class='mr-0' @click="$emit('pullNote', item, 1)" icon>
                <v-icon>looks_one</v-icon>
              </v-btn>

              <v-btn class='mr-0' @click="$emit('pullNote', item, 3)" icon>
                <v-icon>looks_3</v-icon>
              </v-btn>

              <v-btn class='mr-0' @click="$emit('pullNote', item, 5)" icon>
                <v-icon>looks_5</v-icon>
              </v-btn>
            </div>
            <span>Move this many days</span>
          </v-tooltip>

        </v-layout>
      </v-flex>
      <v-flex v-if="isMobileDevice==true" xs12 md8>
        <v-toolbar-title>

          <v-layout justify-center>
       
              <v-chip @click.stop="$emit('clientInfo', item)" class='elevation-1 px-2 title text-truncate' color="white" text-color="vueblue">
                {{item.name}}
              </v-chip>
            
       

          </v-layout>

        </v-toolbar-title>
      </v-flex>

      <v-flex v-if="isMobileDevice==false">
        <v-layout justify-center>
          <v-toolbar-title>
            <v-hover>
              <div slot-scope="{ hover }">
                <div v-if="!hover">
                  <v-chip @click.stop="$emit('senttoggleClient', item.name)" class='elevation-1 px-2 title text-truncate' color="white" text-color="vueblue">
                    {{item.name}}
                  </v-chip>
                </div>

                <div v-if="hover" style="cursor: zoom-in;">
                  <span style="cursor: zoom-in;">
                    <v-chip style="cursor: zoom-in;" @click="$emit('senttoggleClient', item.name)" class='elevation-4 px-2 title text-truncate' color="#white" text-color="vueblue">
                      <span style="cursor: zoom-in;"> {{item.name}} </span>
                    </v-chip>

                  </span>
                </div>
              </div>
            </v-hover>
          </v-toolbar-title>

        </v-layout>
      </v-flex>
      <v-flex v-if="isMobileDevice==false">
        <v-layout justify-end>
          <v-btn @click.stop="$emit('clientInfo', item)" icon>
            <v-icon>info</v-icon>
          </v-btn>
          <v-btn @click="$emit('editNote', item)" icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <v-btn slot="activator" @dblclick="$emit('completedCheck', item)" icon>
              <v-icon color="low">done_outline</v-icon>
            </v-btn>
            <span>Make Completed</span>
          </v-tooltip>
          <v-btn @dblclick="$emit('deleteNote', item)" icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-toolbar>
    <v-card-text style="text-align: justify; text-indent: 2em;" color="white" class='subheading custcard'>
      <v-textarea id="mylh" row-height="29" type="text" class="mywrapper" rows="1" auto-grow readonly solo flat color="white" v-model="this.formatter">

      </v-textarea>
    </v-card-text>
    <v-card-text class="py-0 body-1 font-weight-medium" style="backgroundColor: #CFD8DC ">

      <v-layout class='mt-1'>
        <v-flex xs4 text-xs-left>
          <v-chip id="chipfontcolor" disabled>{{item.date}}</v-chip>
        </v-flex>
        <v-flex xs4 text-xs-center>
          <v-chip id="chipfontcolor" disabled>{{item.type}}</v-chip>
        </v-flex>
        <v-flex xs4 text-xs-right>
          <v-chip id="chipfontcolor" disabled>
            <v-tooltip bottom>
              <v-icon id="lh" slot="activator" @click="$emit('priorityUp', item, -1)">keyboard_arrow_up</v-icon>
              <span>Priority UP</span>
            </v-tooltip>
            <span> Priority - {{item.priority}} </span>

            <v-tooltip bottom>
              <v-icon id="lh" slot="activator" @click="$emit('priorityUp', item, 1)">keyboard_arrow_down</v-icon>
              <span>Priority DOWN</span>
            </v-tooltip>

          </v-chip>

        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>

</template>
<script>
export default {
  name: "list",
  methods: {},
  computed: {
    formatter: function() {
      var mynote = this.item.notes;
      var stringer = JSON.stringify(mynote);
      return JSON.parse(stringer);
    }
  },
  props: {
    isMobileDevice: Boolean,
    info: Boolean,
    names: "",
    types: "",
    dateFunc: {
      type: Object
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      menu: false,
      date: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
textarea {
  text-align: justify;
}
.custcard {
  padding-top: 5px;
  padding-bottom: 0px;
}
#mylh {
  line-height: 20px;
}
#chipfontcolor {
  color: rgba(0, 0, 0, 0.87);
  background-color: #cfd8dc;
  margin: 0px;
}
#lh {
  padding-top: 2px;
}
</style>
