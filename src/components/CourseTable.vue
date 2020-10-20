<template>
  <div>
    <v-data-table :headers="headers" :items="serializedItems" sort-by="grade" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Courses</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedCourse.title" label="Course title"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select v-model="editedCourse.grade" :items="['A', 'B', 'C', 'D', 'E']" label="Grade" />
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="number"
                        min="1"
                        max="25"
                        v-model="editedCourse.credit_load"
                        label="Credit load"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedCourse.code" label="Course code"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this course?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        No courses
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Noted
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    editing: false,
    timeout: 2000,
    dialogDelete: false,
    error: "",
    snackbar: false,
    headers: [
      {
        text: "S/N",
        value: "sno",
      },
      {
        text: "Course title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Grade", value: "grade" },
      { text: "Credit load", value: "credit_load" },
      { text: "Code", value: "code" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    semester: "",
    level: "",
    editedIndex: -1,
    editedCourse: {
      title: "Some title",
      grade: "A",
      credit_load: 3,
      code: "COU 232",
    },
    defaultCourse: {
      title: "Some title",
      grade: "A",
      credit_load: 3,
      code: "COU 232",
    },
  }),

  computed: {
    formTitle() {
      return !this.editing ? "New course" : "Edit course";
    },
    serializedItems() {
      const semester = this.$store.state.levels.years[this.level].semesters[this.semester];
      const courses = Object.keys(semester.courses).map((key) => semester.courses[key]);
      return courses.map((d, index) => ({ ...d, sno: index + 1 }));
    },
  },

  created() {
    const { value: active_level, selected_semester } = this.$store.state.levels.misc.selected_level;
    this.level = active_level;
    this.semester = selected_semester;
  },

  methods: {
    editItem(item) {
      this.editing = true;
      this.dialog = true;
      this.editedIndex = this.serializedItems.findIndex(
        (course) => course.code.toLowerCase() === item.code.toLowerCase(),
      );
      this.editedCourse = this.serializedItems.find((course) => course.code.toLowerCase() === item.code.toLowerCase());
    },

    deleteItem(item) {
      this.editedIndex = this.serializedItems.findIndex(
        (course) => course.code.toLowerCase() === item.code.toLowerCase(),
      );
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("deleteCourse", {
        course_code: this.editedCourse.code,
        semester: this.semester,
        level: this.level,
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedCourse = Object.assign({}, this.defaultCourse);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      if (!this.editing) {
        if (
          !this.serializedItems.find((course) => course.code.toLowerCase() === this.editedCourse.code.toLowerCase())
        ) {
          this.$store.dispatch("addOrUpdateCourse", {
            course: this.editedCourse,
            semester: this.semester,
            level: this.level,
          });
        } else {
          this.snackbar = true;
          this.error = "Course with this code already exists";
        }
      } else {
        // eslint-disable-next-line no-unused-vars
        const { sno, ...otherValues } = this.editedCourse;
        this.$store.dispatch("addOrUpdateCourse", {
          course: otherValues,
          semester: this.semester,
          level: this.level,
        });
      }
      this.close();
    },
  },
};
</script>
