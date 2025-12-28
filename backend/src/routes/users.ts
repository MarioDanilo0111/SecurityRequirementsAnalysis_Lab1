import { Router } from "express";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../services/userService";

const router = Router();

/* GET /users */
router.get("/", (req, res) => {
  try {
    const users = getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error("GET /users failed:", err);
    return res
      .status(500)
      .json({ error: "Internal server error while fetching users." });
  }
});

/* POST /users */
router.post("/", (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    const newUser = addUser(name, email, role);
    console.log("New user created: ", newUser);

    return res.status(201).json(newUser);
  } catch (err) {
    console.error("No new user Found", err);
    return res.status(500).json({ error: "Failed to create user." });
  }
});

/* PUT /users:id -> Replace entire user */
router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0)
      return res
        .status(400)
        .json({ error: `Invalid user ID: ${req.params.id}` });

    const { name, email, role } = req.body;

    // PUT requires all fields
    if (!name || !email || !role) {
      return res.status(400).json({
        error: "PUT request all fields: name, email and role",
      });
    }

    const updated = updateUser(id, { name, email, role });

    if (!updated) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log(`User with id ${id} replaced successfully`);

    return res.status(200).json(updated);
  } catch (err) {
    console.error("PUT /user/:id failed: ", err);
    return res
      .status(500)
      .json({ error: "Internal server error while updating user." });
  }
});

/* PATCH /users/:id -> Partial update (optional fields) */

router.patch("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ error: `Invalid user id: '${req.params.id}'` });
    }
    // No field provided?
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "PATCH requires at least one field to update." });
    }

    const updated = updateUser(id, req.body);
    if (!updated) {
      return res.status(400).json({ error: `User with id ${id} not found` });
    }
    console.log(`User with id ${id} updated (PATCH)`);
    return res.status(200).json(updated);
  } catch (err) {
    console.error("PATCH /users/:id field:", err);
    return res
      .status(500)
      .json({ error: "Internal server error while partially updatin user." });
  }
});

/* Delete router */
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    // Invalid ID
    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ error: `Invalid user-id ${req.params.id}` });
    }
    // Attempt to delete
    const deleteRequest = deleteUser(id);

    if (!deleteRequest) {
      return res
        .status(404)
        .json({ error: `User with id ${id} was not found.` });
    }

    console.log(`User with id ${id} was deleted successfully`);
    // 204 must NOT return a body
    return res.status(204).send();
  } catch (err) {
    console.error("This error ocurred: ", err);
    return res.status(500).json({ error: "Failed to delete user." });
  }
});

export default router;
