<template>
  <div class="mb-7">
    <RouteMenu title="Levels" />

    <v-row class="mt-4" align="baseline">
      <v-col class="d-flex justify-space-between" sm="6">
        <v-select v-model="selectedLevel" :hint="levelSelectHint" :items="levels" label="Select level" dense outlined>
        </v-select>
      </v-col>
      <v-col class="text-end" sm="6">
        <p>CGPA: 3.5</p>
      </v-col>
    </v-row>

    <v-btn-toggle color="primary darken-1" class="mb-5" v-model="selectedSemester" rounded mandatory>
      <v-btn>
        <span class="caption">
          Semester 1
        </span>
      </v-btn>
      <v-btn>
        <span class="caption">
          Semester 2
        </span>
      </v-btn>
    </v-btn-toggle>
    <CourseTable />

    <v-card class="my-4 pa-4 d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon>mdi-bookshelf </v-icon>
        <p class="body-2 mb-0 ml-2">18 Courses</p>
      </div>
      <div class="d-flex align-center">
        <v-icon>mdi-water-outline </v-icon>
        <p class="body-2 mb-0 ml-2">24 Units</p>
      </div>
      <div class="d-flex align-center">
        <v-icon>mdi-package-variant-closed </v-icon>
        <p class="body-2 mb-0 ml-2">4.42 GPA</p>
      </div>
    </v-card>
  </div>
</template>

<script>
import { query as q, Client } from "faunadb";
import { mapState } from "vuex";
const client = new Client({ secret: localStorage.getItem("DB_SECRET") });
import RouteMenu from "../components/RouteMenu";

import CourseTable from "../components/CourseTable";
export default {
  components: { RouteMenu, CourseTable },
  data() {
    return {
      levels: ["100", "200", "300"],
    };
  },
  computed: {
    levelSelectHint() {
      return this.$store.state.authenticated
        ? "change your level in profile to add new level"
        : "create an account to add a new level";
    },
    selectedSemester: {
      get() {
        return this.$store.state.levels.misc.selected_level.selected_semester;
      },
      set(semester) {
        this.$store.dispatch("selectActiveLevelOrSemester", { field: "selected_semester", value: semester });
      },
    },
    selectedLevel: {
      get() {
        return this.$store.state.levels.misc.selected_level.value;
      },
      set(level) {
        this.$store.dispatch("selectActiveLevelOrSemester", { field: "value", value: level });
      },
    },
    ...mapState({}),
  },
  methods: {
    async handleLevelChange(level) {
      try {
        const newLevel = client.query(q.Get(q.Identity(level)));
        return newLevel;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
