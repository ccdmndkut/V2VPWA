<template>
  <div>
    <v-card id="card" class="mb-5">
      <v-toolbar class="py-1" flat dense color="vuegreendark" dark>
        <v-layout justify-start>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              class="mr-0"
              @click="$emit('pullNote', item, 0);"
              icon
            >
              <v-icon color="low">looks</v-icon>
            </v-btn>
            <span>Pull to today</span>
          </v-tooltip>
          <v-tooltip bottom>
            <div slot="activator">
              <v-btn class="mr-0" @click="$emit('pullNote', item, 1);" icon>
                <v-icon>looks_one</v-icon>
              </v-btn>
              <v-btn class="mr-0" @click="$emit('pullNote', item, 3);" icon>
                <v-icon>looks_3</v-icon>
              </v-btn>
              <v-btn class="mr-0" @click="$emit('pullNote', item, 5);" icon>
                <v-icon>looks_5</v-icon>
              </v-btn>
            </div>
            <span>Move this many days</span>
          </v-tooltip>
        </v-layout>
        <v-layout justify-center>
          <v-toolbar-title>
            <v-chip
              class="elevation-1 px-2 title text-truncate"
              color="white"
              text-color="vueblue"
            >
              {{ item.name }}
            </v-chip>
          </v-toolbar-title>
        </v-layout>
        <v-layout justify-end>
          <v-btn @click.stop="$emit('clientInfo', item);" icon>
            <v-icon>info</v-icon>
          </v-btn>
          <v-btn @click="$emit('editNote', item);" icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              @dblclick="$emit('completedCheck', item);"
              icon
            >
              <v-icon color="low">done_outline</v-icon>
            </v-btn>
            <span>Make Completed</span>
          </v-tooltip>
          <v-btn @dblclick="$emit('deleteNote', item);" icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-layout>
      </v-toolbar>
      <v-card-text
        style="text-align: justify; text-indent: 2em;"
        color="white"
        class="subheading custcard"
      >
        <v-textarea
          id="mylh"
          row-height="29"
          type="text"
          class="mywrapper"
          rows="1"
          auto-grow
          readonly
          solo
          flat
          color="white"
          v-model="formatter"
        >
        </v-textarea>
      </v-card-text>
      <v-card-text
        class="py-0 body-1 font-weight-medium"
        style="backgroundColor: #CFD8DC "
      >
        <v-layout class="mt-1">
          <v-flex xs4 text-xs-left>
            <v-chip id="chipfontcolor" disabled>{{ item.date }}</v-chip>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <v-chip id="chipfontcolor" disabled>{{ item.type }}</v-chip>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-chip id="chipfontcolor" disabled>
              <v-tooltip bottom>
                <v-icon
                  id="lh"
                  slot="activator"
                  @click="$emit('priorityUp', item, -1);"
                  >keyboard_arrow_up</v-icon
                >
                <span>Priority UP</span>
              </v-tooltip>
              <span> Priority - {{ item.priority }} </span>

              <v-tooltip bottom>
                <v-icon
                  id="lh"
                  slot="activator"
                  @click="$emit('priorityUp', item, 1);"
                  >keyboard_arrow_down</v-icon
                >
                <span>Priority DOWN</span>
              </v-tooltip>
            </v-chip>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "listitem",
  props: ["item", "loading"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    formatter() {
      var mynote = this.item.notes;
      var stringer = JSON.stringify(mynote);
      return JSON.parse(stringer);
    }
  }
};
</script>
<style scoped>
#card {
  margin-left: 10%;
  margin-right: 10%;
}
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
