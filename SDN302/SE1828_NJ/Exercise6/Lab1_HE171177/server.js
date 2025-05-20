const express = require('express');
const Database = require('./database.json');
const app = express();
const port = 9999;

// Middleware 
app.use(express.json());

const formatDate = (dob) => {
    const [year, month, day] = dob.split('/');
    return `${day}-${month}-${year}`;
};

// ROUTE GET 
app.get('/employees', (req, res) => {
    if (!Database.result) {
        return res.status(500).json({ error: 'Invalid data format' });
    }

    const employees = Database.result.map(emp => ({
        id: emp.id,
        name: `${emp.lastname} ${emp.firstname}`,
        dob: formatDate(emp.dob),
        address: `${emp.location.address}, ${emp.location.city}, ${emp.location.country}`
    }));

    res.json({ message: "List of Employees", result: employees });
});

// ROUTE GET BY ID
app.get('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id, 10);
    const employee = Database.result.find(emp => emp.id === employeeId);

    if (!employee) {
        return res.status(404).json({ error: 'Không tồn tại nhân viên có mã là: ' + req.params.id });
    }

    const formattedEmployee = {
        id: employee.id,
        name: `${employee.lastname} ${employee.firstname}`,
        dob: formatDate(employee.dob),
        address: `${employee.location.address}, ${employee.location.city}, ${employee.location.country}`
    };

    res.json(formattedEmployee); // Trả về đối tượng trực tiếp
});


// ROUTE GET SEARCH - lastName
app.get('/employees/search/:fname', (req, res) => {
    const searchStr = req.params.fname.toLowerCase();
    const matchedEmployees = Database.result
        .filter(emp => emp.lastname.toLowerCase().startsWith(searchStr))
        .map(emp => ({
            id: emp.id,
            name: `${emp.lastname} ${emp.firstname}`,
            dob: formatDate(emp.dob),
            address: `${emp.location.address}, ${emp.location.city}, ${emp.location.country}`
        }));

    if (matchedEmployees.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy nhân viên có lastName bắt đầu bằng: ${req.params.fname}` });
    }

    res.json(matchedEmployees);
});




// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

