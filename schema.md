// Do computations on the DB itself. The app will pull data down

// Course
{
    ref
    data: {
        title: string,
        grade: string,
        code: string,
        credit_load: number,
        semester_ref: semester_ref,
        user_ref: user_ref
    },
}

// Semester
{
    ref,
    data: {
        courses: [course_ref],
        id: number,
        cumulative: {
            course_count: number,
            total_units: number,
            total_grade_point: number,
            grade_point_average: number,
        },
        level_ref: level_ref,
        user_ref: user_ref
    }
}


// Level
{
    ref,
    data: {
        semesters: [semester_ref, semester_ref],
        cumulative: {
            course_count: number,
            total_units: number,
            total_grade_point: number,
            grade_point_average: number,
        },
        user_ref: user_ref
    }
}

// User
{
    ref,
    data: {
        levels: [level_ref],
        biodata: {
            firstName,
            lastName,
            email
        },
        maxLevels: number
    }
}
