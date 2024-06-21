import { Router } from "express";
import { StudentRoute } from "../modules/student/student.route";
import { UserRoute } from "../modules/user/user.route";
import { AcademicSemisterRoutes } from "../modules/academicSemister/academicSemister.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { courseRoute } from "../modules/Course/course.route";
import { semisterRegistrationRoutes } from "../modules/semisterRegistration/semisterRagistration.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";

const router = Router();

const moudleRoute = [
  {
    path: "/students",
    route: StudentRoute,
  },
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/academic-semister",
    route: AcademicSemisterRoutes,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/course",
    route: courseRoute,
  },
  {
    path: "/semister-registration",
    route: semisterRegistrationRoutes,
  },
  {
    path: "/offered-course",
    route: offeredCourseRoutes,
  },
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
