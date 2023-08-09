import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// for /api/users if we get a POST request, we want to register a user
// if we get a GET request, we want to get all users
router.route("/").post(registerUser).get(protect, admin, getUsers);

// for /api/users/logout if we get a POST request, we want to logout a user
router.post("/logout", logoutUser);

// for /api/users/login if we get a POST request, we want to login a user
router.post("/login", loginUser);

// for /api/users/profile if we get a GET request, we want to get a user's profile
// if we get a PUT request, we want to update a user's profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// for /api/users/:id if we get a DELETE request, we want to delete a user
// if we get a GET request, we want to get a user by id
// if we get a PUT request, we want to update a user
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
