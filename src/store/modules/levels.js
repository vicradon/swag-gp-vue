// import { query as q, Client } from "faunadb";
// const client = new Client({ secret: localStorage.getItem("DB_SECRET") });

const yearTemplate = (level) => ({
  level,
  semesters: [
    {
      id: 1,
      courses: [],
      cumulative: {
        course_count: 0,
        total_units: 0,
        total_grade_point: 0,
        grade_point_average: 0,
      },
    },
    {
      id: 2,
      courses: [],
      cumulative: {
        course_count: 0,
        total_units: 0,
        total_grade_point: 0,
        grade_point_average: 0,
      },
    },
  ],
  cumulative: {
    course_count: 0,
    total_units: 0,
    total_grade_point: 0,
    grade_point_average: 0,
  },
});

const state = () => ({
  misc: {
    selected_level: {
      value: 100,
      selected_semester: 0,
    },
  },
  years: [yearTemplate(100), yearTemplate(200), yearTemplate(300)],
  cumulative: {
    course_count: 0,
    total_units: 0,
    total_grade_point: 0,
    grade_point_average: 0,
  },
});

// const actions = {
//   selectSemester({ commit }) {
//     client.query()
//   },
// };

const mutations = {
  setActiveLink(state, link) {
    state.activeLink = link;
  },
  toggleSidebar(state) {
    state.isOpen = !state.isOpen;
  },
};

export default {
  state,
  mutations,
};
