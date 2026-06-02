const { z } = require("zod");

/**
 * Shared field definitions derived from seed_db/tables.sql:
 *   users.name         → VARCHAR(100) NOT NULL
 *   users.email        → VARCHAR(100) NOT NULL UNIQUE
 *   user_profiles.*    → see individual max lengths below
 */
const studentFieldsSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must not exceed 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .max(100, "Email must not exceed 100 characters"),
    gender: z.string().max(10).optional().nullable(),
    phone: z.string().max(20).optional().nullable(),
    dob: z.string().optional().nullable(),
    currentAddress: z.string().max(50).optional().nullable(),
    permanentAddress: z.string().max(50).optional().nullable(),
    fatherName: z.string().max(50).optional().nullable(),
    fatherPhone: z.string().max(20).optional().nullable(),
    motherName: z.string().max(50).optional().nullable(),
    motherPhone: z.string().max(20).optional().nullable(),
    guardianName: z.string().max(50).optional().nullable(),
    guardianPhone: z.string().max(20).optional().nullable(),
    relationOfGuardian: z.string().max(30).optional().nullable(),
    class: z.string().max(50).optional().nullable(),
    section: z.string().max(50).optional().nullable(),
    admissionDate: z.string().optional().nullable(),
    roll: z.number().int().positive().optional().nullable(),
    systemAccess: z.boolean().optional().nullable(),
});

const CreateStudentSchema = z.object({
    body: studentFieldsSchema,
});

const UpdateStudentSchema = z.object({
    body: studentFieldsSchema.partial(),
    params: z.object({
        id: z.string().min(1, "Student ID is required"),
    }),
});

module.exports = {
    CreateStudentSchema,
    UpdateStudentSchema,
};
