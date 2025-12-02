import { Router } from "express";
import { getUsers, addUser, deleteUser } from "../services/userService.js";

const router = Router();

router.get("/", (req, res) => {
  const users = getUsers();
  res.json(users);
});

router.post("/", (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Failed to create user" });
    }
    const newUser = addUser(name, email);
    console.log("New user created: ", newUser);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error("No new user Found", err);
    return res.status(500).json({ error: "Failed to create user." });
  }
});

/* Delete router */
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(404)
        .json({ error: `The id-number ${id} was not found` });
    }
    const deleteRequest = deleteUser(id);
    if (!deleteRequest) {
      return res.status(404);
    } else {
      console.log(`User with id: ${id} was deleted`);
      return res.status(204).send();
    }
  } catch (err) {
    console.error("This error ocurred: ", err);
    return res.status(500).json({ error: "Failed to delete user." });
  }
});

export default router;
