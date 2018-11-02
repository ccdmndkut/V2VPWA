 <template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm11 md9 lg8>
          <v-card style="maxWidth:1080px" class="elevation-12 pb-4">
            <v-toolbar dark flat color="vueblue">
              <v-toolbar-title>Edit Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-layout row wrap justify-space-around>
                  <v-flex class='ml-5' xs4>
                    <v-text-field class='text-truncate' v-model="noteEdit.name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-autocomplete v-model="noteEdit.type" :items="types" item-text="type" label="Type"></v-autocomplete>
                  </v-flex>
                  <v-flex xs1>
                    <v-text-field v-model="noteEdit.priority" label="Priority"></v-text-field>
                  </v-flex>
                  <v-flex class='mr-5' xs2>
                    <v-menu ref="menu" :close-on-content-click="true" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                      <v-text-field slot="activator" v-model="noteEdit.date" label="Date" prepend-icon="event" @keyup.up="datechange(1)" @keyup.down="datechange(-1)" readonly></v-text-field>
                      <v-date-picker v-model="noteEdit.date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-space-around>
                  <v-flex xs10>
                    <v-textarea outline auto-grow v-model="noteEdit.notes" label="Note"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>

            <v-card-actions class='mb-3'>
              <v-spacer></v-spacer>
              <v-btn class=' mr-3' round color="vuegreendark" dark @click="$emit('submitEdit')">
                submit
              </v-btn>
              <v-btn round flat outline dark color="vuegreendark" @click="$emit('editToggleFunc')">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
var moment = require("moment");
export default {
  name: "editnote",
  methods: {
    datechange(d) {
      var newdate = moment(this.noteEdit.date).add(d, "d");
      this.noteEdit.date = moment(newdate).format("YYYY-MM-DD");
    }
  },
  props: {
    names: "",
    types: "",
    noteEdit: ""
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
</style>
