import { Router } from "express";
import { StudentRoute } from "../modules/student/student.route";
import { UserRoute } from "../modules/user/user.route";

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
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
