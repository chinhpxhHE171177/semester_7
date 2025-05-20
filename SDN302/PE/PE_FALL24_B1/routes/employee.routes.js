const express = require('express');
const Employee = require('../models/employee');
const Department = require('../models/department');
const Job = require('../models/job');
const department = require('../models/department');
const router = express.Router();

//1.Get all employees
router.get('/list', async (req, res, next) => {
    try {
        const employees = await Employee.find()
            .populate('department', 'name')
            .populate('jobs');

        if (!employees) {
            return res.status(404).send('No employees found');
        }

        const formattedEmp = employees.map(emp => ({
            employeeId: emp._id,
            fullname: `${emp.name.firstName} ${emp.name.middleName} ${emp.name.lastName}`,
            email: emp.account.email,
            department: emp.department.name,
            job: emp.jobs.map(job => ({
                name: job.name,
                issues: job.issues.map(issue => ({
                    title: issue.title,
                    isCompleted: issue.isCompleted
                }))
            }))
        }))

        res.status(200).json(formattedEmp)
    } catch (err) {
        next(err);
    }
});

//3.Create new job 
router.post('/:employeeId/add-job', async (req, res, next) => {
    try {
        const { name, issues, startDate, endDate } = req.body;
        const { employeeId } = req.params;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const newJob = new Job({
            name,
            issues,
            startDate,
            endDate
        });

        await newJob.save();

        employee.jobs.push(newJob._id);
        await employee.save();

        // Lấy danh sách công việc sau khi thêm mới
        const updatedEmployee = await Employee.findById(employeeId).populate('jobs', '_id');

        res.status(201).json({
            message: 'Add a new job successfully',
            result: {
                employeeId: employee._id,
                fullName: `${employee.name.firstName} ${employee.name.middleName} ${employee.name.lastName}`,
                //jobsList: updatedEmployee.jobs.map(job => job._id) // Trả về danh sách ObjectId
                jobsList: [newJob._id] // Mảng chỉ chứa ObjectId của công việc vừa tạo
            }
        })


    } catch (error) {
        next(error);
    }
})

module.exports = router;