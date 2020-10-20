import { query as q, Client } from "faunadb";
import Vue from "vue";

const yearTemplate = (level) => ({
  level,
  semesters: {
    0: {
      id: 0,
      courses: {},
      cumulative: {
        course_count: 0,
        total_units: 0,
        total_grade_point: 0,
        grade_point_average: 0,
      },
    },
    1: {
      id: 1,
      courses: {},
      cumulative: {
        course_count: 0,
        total_units: 0,
        total_grade_point: 0,
        grade_point_average: 0,
      },
    },
  },
  cumulative: {
    course_count: 0,
    total_units: 0,
    total_grade_point: 0,
    grade_point_average: 0,
  },
});

export const initialLevelsState = {
  misc: {
    selected_level: {
      value: "100",
      selected_semester: "0",
    },
  },
  years: { "100": yearTemplate("100"), "200": yearTemplate("200"), "300": yearTemplate("300") },
  cumulative: {
    course_count: 0,
    total_units: 0,
    total_grade_point: 0,
    grade_point_average: 0,
  },
};

const state = () => initialLevelsState;

const actions = {
  selectActiveLevelOrSemester({ commit }, { field, value }) {
    const client = new Client({ secret: localStorage.getItem("DB_SECRET") });

    if (localStorage.getItem("app-state") && JSON.parse(localStorage.getItem("app-state")).authenticated) {
      return new Promise((resolve, reject) => {
        client
          .query(
            q.Update(q.Identity(), {
              data: {
                levels: {
                  misc: {
                    selected_level: {
                      [field]: value,
                    },
                  },
                },
              },
            }),
          )
          .then(() => {
            commit("updateSelectedLevel", { field, value });
            resolve();
          })
          .catch((error) => reject(error));
      });
    } else {
      commit("updateSelectedLevel", { field, value });
    }
  },
  addOrUpdateCourse({ commit }, { course, semester, level }) {
    const client = new Client({ secret: localStorage.getItem("DB_SECRET") });

    if (JSON.parse(localStorage.getItem("app-state")).authenticated) {
      return new Promise((resolve, reject) => {
        client
          .query(
            q.Update(q.Identity(), {
              data: {
                levels: {
                  years: {
                    [level]: {
                      semesters: {
                        [semester]: {
                          courses: {
                            [course.code]: course,
                          },
                        },
                      },
                    },
                  },
                },
              },
            }),
          )
          .then(() => {
            commit("addOrUpdateCourse", { course, semester, level });
            resolve();
          })
          .catch((error) => reject(error));
      });
    } else {
      commit("addOrUpdateCourse", { course, semester, level });
    }
  },
  deleteCourse({ commit }, { course_code, semester, level }) {
    const client = new Client({ secret: localStorage.getItem("DB_SECRET") });

    if (JSON.parse(localStorage.getItem("app-state")).authenticated) {
      return new Promise((resolve, reject) => {
        client
          .query(
            q.Let(
              {
                user: q.Get(q.Identity()),
                courses: q.Select(["data", "levels", "years", level, "semesters", semester, "courses"], q.Var("user")),
                course: q.Select([course_code], q.Var("courses")),
                updatedCourses: q.Filter(
                  q.ToArray(q.Var("courses")),
                  q.Lambda("val", q.Not(q.Equals(q.Var("val"), [course_code, q.Var("course")]))),
                ),
              },
              q.Update(q.Var("user"), {
                data: {
                  levels: {
                    years: {
                      [level]: {
                        semesters: {
                          [semester]: {
                            courses: q.ToObject(q.Var("updatedCourses")),
                          },
                        },
                      },
                    },
                  },
                },
              }),
            ),
          )
          .then(() => {
            commit("deleteCourse", { course_code, semester, level });
            resolve();
          })
          .catch((error) => reject(error));
      });
    } else {
      commit("deleteCourse", { course_code, semester, level });
    }
  },
};

const mutations = {
  updateSelectedLevel(state, { field, value }) {
    state.misc.selected_level[field] = value;
  },
  addOrUpdateCourse(state, { course, semester, level }) {
    Vue.set(state.years[String(level)].semesters[String(semester)].courses, course.code, course);
  },
  deleteCourse(state, { course_code, semester, level }) {
    const target_semester = state.years[String(level)].semesters[String(semester)];
    delete target_semester.courses[course_code];
    Vue.set(target_semester, "courses", target_semester.courses);
  },
  setActiveLink(state, link) {
    state.activeLink = link;
  },
  toggleSidebar(state) {
    state.isOpen = !state.isOpen;
  },
};

export default {
  state,
  actions,
  mutations,
};
