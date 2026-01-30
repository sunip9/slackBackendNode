import express from "express";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users";

const router = express.Router();

/**
 * @swagger
 *  /api/users:
 *   get:
 *      summary: All Users
 *      tags: [Users Basic]
 *      description: All User List
 *      security:
 *          - jwt: []
 *      responses:
 *          '200':
 *              description: All User List
 *              content:
 *                  application/json:
 *                          examples:
 *                             Users found:
 *                               value:
 *                                 status: 200
 *                                 success: true
 *                                 message: "Data found."
 *                                 count: 2
 *                                 data: [
 *                                      {
 *                                       id: 3,
 *                                       created_at: "2022-08-23T14:12:32.971Z",
 *                                       updated_at: "2022-08-23T14:12:32.971Z",
 *                                       email: "test@test.com",
 *                                      },
 *                                      {
 *                                       id: 4,
 *                                       created_at: "2022-08-23T14:12:32.971Z",
 *                                       updated_at: "2022-08-23T14:12:32.971Z",
 *                                       email: "test2@test.com",
 *                                      },
 *                                    ]
 *                             User not found:
 *                               value:
 *                                 success: false
 *                                 message: "No Users found! Please try again later."
 *                                 errors: {}
 *          '500':
 *              description: Invalid Request.
 *              content:
 *                  application/json:
 *                       example:
 *                          { "success": false, "message": "Something went wrong!! Please try again later", "errors":"Error object" }
 */

router.get("/api/users", getUsers);

router.get("/api/users/:id", getUser);

router.post("/api/users", addUser);

router.put("/api/users/:id", updateUser);

router.delete("/api/users/:id", deleteUser);

export default router;
