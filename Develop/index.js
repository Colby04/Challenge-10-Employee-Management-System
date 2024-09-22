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

// Function to add a department
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

// Call the main menu
mainMenu();