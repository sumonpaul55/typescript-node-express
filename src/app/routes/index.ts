import { Router } from "express";
import { StudentRoute } from "../modules/student/student.route";
import { UserRoute } from "../modules/user/user.route";
import { AcademicSemisterRoutes } from "../modules/academicSemister/academicSemister.route";

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
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
