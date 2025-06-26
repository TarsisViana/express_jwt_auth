import { Router } from "express";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.use("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this router!",
  });
});

export default router;
