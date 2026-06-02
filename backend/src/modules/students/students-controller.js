const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll, page, limit } = req.query;
    const parsedPage = parseInt(page, 10) || DEFAULT_PAGE;
    const parsedLimit = parseInt(limit, 10) || DEFAULT_LIMIT;
    const offset = (parsedPage - 1) * parsedLimit;

    const result = await getAllStudents({
        name,
        className,
        section,
        roll,
        limit: parsedLimit,
        offset,
    });

    res.json({
        students: result.students,
        total: result.total,
        page: parsedPage,
        limit: parsedLimit,
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const payload = req.body;
    const message = await updateStudent({ ...payload, userId });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const { status } = req.body;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await deleteStudent(id);
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent,
};
