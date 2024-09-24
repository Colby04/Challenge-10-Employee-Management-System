const { Client } = require('pg');
const inquirer = require('inquirer');

// Connect to PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_db',
    password: '1204Sarabilane$$',
    port: 5432,
});

client.connect();

const mainMenu = async () => {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    switch (answer.action) {
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Update Employee Role':
            addUpdateemployeerole();
            break;

        // Add more cases here
        case 'Exit':
            client.end(); // Close the database connection
            console.log("Goodbye!");
            break;
    }
};

// Function to view all departments
const viewAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
    mainMenu();
};

// Function to view all roles
const viewAllRoles = async () => {
    const res = await client.query('SELECT * FROM role');
    console.table(res.rows);
    mainMenu();
};

// Function to view all employees
const viewAllEmployees = async () => {
    const res = await client.query('SELECT * FROM employee');
    console.table(res.rows);
    mainMenu();
};

const addDepartment = async () => {
    const answer = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
    });

    await client.query('INSERT INTO department (name) VALUES ($1)', [answer.name]);
    console.log(`Department "${answer.name}" added.`);
    mainMenu();
};
const addRole = async () => {
    const departments = await client.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(department => ({
        name: department.name,
        value: department.id
    }));

    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the new role:',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for the new role:',
            choices: departmentChoices,
        },
    ]);

    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.title, answer.salary, answer.department_id]);
    console.log(`Role "${answer.title}" added.`);
    mainMenu();
};

const addEmployee = async () => {
    const roles = await client.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employees = await client.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the new employee:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the new employee:',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role for the new employee:',
            choices: roleChoices,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager for the new employee:',
            choices: employeeChoices,
        },
    ]);

    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
    console.log(`Employee "${answer.first_name} ${answer.last_name}" added.`);
    mainMenu();
};

const addUpdateemployeerole = async () => {
    const employees = await client.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roles = await client.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to update:',
            choices: employeeChoices,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
        },
    ]);

    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answer.role_id, answer.employee_id]);
    console.log(`Employee role updated.`);
    mainMenu();
};

// Call the main menu
mainMenu();