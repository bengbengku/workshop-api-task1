import { Router } from "express";
import * as controller from "./controllers/index.js";

const router = Router();

router.post("/", controller.create);
// router.get("/:id", controller.read);
// router.post("/", controller.customer);
// router.patch("/:id", controller.update);
// router.delete("/:id", controller.destroy);

export default router;
