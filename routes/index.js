const router = require('express').Router();
const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

router.use("/api/thought", thoughtRoutes);
router.use("/api/user", userRoutes);

module.exports = router;