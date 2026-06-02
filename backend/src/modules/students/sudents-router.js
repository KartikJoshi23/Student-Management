const express = require("express");
const router = express.Router();
const studentController = require("./students-controller");
const { validateRequest } = require("../../utils");
const { CreateStudentSchema, UpdateStudentSchema } = require("./students-schema");

router.get("", studentController.handleGetAllStudents);
router.post("", validateRequest(CreateStudentSchema), studentController.handleAddStudent);
router.get("/:id", studentController.handleGetStudentDetail);
router.post("/:id/status", studentController.handleStudentStatus);
router.put("/:id", validateRequest(UpdateStudentSchema), studentController.handleUpdateStudent);
router.delete("/:id", studentController.handleDeleteStudent);

module.exports = { studentsRoutes: router };
