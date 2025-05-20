const express = require('express');
const Employee = require('../models/employee');
const Department = require('../models/department');
const router = express.Router();

// Lấy danh sách nhân viên theo phòng ban và người quản lý
router.get('/:departmentId', async (req, res, next) => {
    try {
        const { departmentId } = req.params;

        // Kiểm tra phòng ban có tồn tại không
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Lấy tất cả nhân viên trong phòng ban
        const employees = await Employee.find({ department: departmentId }).populate('department', 'name');

        if (!employees.length) {
            return res.status(404).json({ message: 'No employees found in this department' });
        }

        res.status(200).json({
            department: department.name,
            employees: employees.map(emp => ({
                id: emp._id,
                fullname: `${emp.name.firstName} ${emp.name.middleName || ''} ${emp.name.lastName}`.trim()
            }))
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
