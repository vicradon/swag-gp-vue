<template>
  <div class="mb-7">
    <RouteMenu title="Levels" />

    <v-row class="mt-4" align="baseline">
      <v-col class="d-flex justify-space-between" sm="6">
        <v-select value="300" :items="levels" label="Select level" dense outlined> </v-select>
      </v-col>
      <v-col class="text-end" sm="6">
        <p>CGPA: 3.5</p>
      </v-col>
    </v-row>

    <v-btn-toggle color="primary" class="mb-5" v-model="selectedSemester" rounded>
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
import RouteMenu from "../components/RouteMenu";

import CourseTable from "../components/CourseTable";
export default {
  components: { RouteMenu, CourseTable },
  data: () => ({
    levels: ["100", "200", "300"],
    selectedSemester: 0,
  }),
};
</script>
