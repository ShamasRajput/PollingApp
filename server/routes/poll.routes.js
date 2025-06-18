const express = require("express");
const router = express.Router();
const pollController = require("../controllers/poll.controller");
const upload = require("../middleware/upload.middleware");
const authMiddleware = require("../middleware/auth.middleware");

// 🔓 Public route 
router.get("/", pollController.getPolls);
router.post('/:id/vote', pollController.voteOnPoll);


// 🔐 Protected routes - must be logged in
router.post("/", authMiddleware, upload.single("image"), pollController.createPoll);
router.get("/me", authMiddleware, pollController.getMyPolls); 
router.get("/:id", authMiddleware, pollController.getPoll);
router.put("/:id", authMiddleware, upload.single("image"), pollController.updatePoll);
router.delete("/:id", authMiddleware, pollController.deletePoll);

module.exports = router;
