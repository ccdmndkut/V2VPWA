 <template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm11 md8 lg6>
          <v-card class="elevation-12">
            <v-toolbar dark flat color="vueblue">
              <v-layout align-center justify-start>
                <v-flex xs6>
                  <v-toolbar-title>New Note</v-toolbar-title>
                </v-flex>
              </v-layout>
              <v-layout justify-end>
                <v-flex xs6>
                  <v-switch color="low" class='ml-5 mt-3' dark label="Shared" v-model="noteNew.switch1"></v-switch>

                </v-flex>
              </v-layout>

            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-layout row wrap justify-space-between>
                  <v-flex xs8>
                    <v-autocomplete class='mr-5' v-if="newClient==false" autofocus v-model="noteNew.name" :items="names" item-text="name" label="Client"></v-autocomplete>
                    <v-text-field autofocus class='mr-5' v-if="newClient==true" v-model="noteNew.name" label="New Client" required></v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <v-tooltip bottom>
                      <v-btn round class='ml-5' slot="activator" dark @click="newClient=!newClient, noteNew.name=''" color="vuegreendark">Add New Client</v-btn>

                      <span>Add new client</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-space-between>
                  <v-flex xs4>
                    <v-autocomplete v-model="noteNew.type" :items="types" item-text="type" label="Type"></v-autocomplete>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field type="number" v-model="noteNew.priority" label="Priority" required></v-text-field>
                  </v-flex>
                  <v-flex xs4>

                    <v-menu ref="menu" :close-on-content-click="true" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                      <v-text-field slot="activator" v-model="noteNew.date" label="Date" prepend-icon="event" @keyup.up="datechange(1)" @keyup.down="datechange(-1)" readonly></v-text-field>
                      <v-date-picker v-model="noteNew.date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-textarea class='mt-4' outline auto-grow v-model="noteNew.notes" label="Note" required></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions class='mb-3'>
              <v-spacer></v-spacer>
              <v-btn class='mb-3 mr-3' round color="vuegreendark" dark @click="$emit('submitNew')">
                submit
              </v-btn>
              <v-btn class='mb-3' round flat outline dark color="vuegreendark" @click="$emit('editToggleFunc')">Cancel</v-btn>
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
  name: "newnote",
  methods: {
    datechange(d) {
      var newdate = moment(this.noteNew.date).add(d, "d");
      this.noteNew.date = moment(newdate).format("YYYY-MM-DD");
    }
  },
  props: {
    names: "",
    types: "",
    noteNew: {}
  },
  data() {
    return {
      menu: false,
      date: "",
      newClient: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
