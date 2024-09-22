# Challenge-10-Employee-Tracker

# Description
The Employee Tracker is a command-line application that allows business owners to manage and organize their employee database efficiently. This tool provides an easy-to-use interface for viewing, adding, and updating employee information, roles, and departments using Node.js, Inquirer, and PostgreSQL. It acts as a Content Management System (CMS) to track and manage employee data.

# Table of Contents
Installation
Usage
Features
Database Schema
Walkthrough Video
Technologies Used
License
Contributing
Questions

# Installation
To install and run the Employee Tracker, follow these steps:

1. Clone the Repository
    Clone this repository to your local machine using the following command:

    git clone https://github.com/yourusername/employee-tracker.git
    cd employee-tracker

2. Install Dependencies
    Install the required npm packages, including pg and inquirer:
    npm install

3. Set Up PostgreSQL Database
    You need to set up the PostgreSQL database:

4. Create a PostgreSQL database and name it accordingly (e.g., employee_db).
    Run the schema.sql file to set up the required tables:
    psql -d employee_db -f schema.sql

    Optionally, use the seeds.sql file to pre-populate the database with sample data:
    psql -d employee_db -f seeds.sql

5. Configure Environment Variables
    Create a .env file in the root of your project and provide your PostgreSQL credentials:
    PG_HOST=localhost
    PG_PORT=5432
    PG_USER=your_pg_user
    PG_PASSWORD=your_pg_password
    PG_DATABASE=employee_db

6. Run the Application
    Start the application using Node.js:
    node index.js

# Usage
Once the application is started, you will be presented with the following options in the terminal:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Simply choose an option, and the application will guide you through the process of managing the employee database.

Features
View Departments: See a list of all departments and their IDs.
View Roles: See a list of job titles, their department, and salary information.
View Employees: View employee details, including their role, department, salary, and manager.
Add a Department: Add a new department to the database.
Add a Role: Add a new role with title, salary, and department.
Add an Employee: Add a new employee with details like name, role, and manager.
Update Employee Role: Update an employee's role.
Database Schema
The database schema consists of three tables:

# Walkthrough Video
A walkthrough video demonstrating the functionality of the application can be found at:

Walkthrough Video Link
(Ensure that you replace the link with your actual walkthrough video URL)

# Technologies Used
Node.js: Backend JavaScript runtime.
Inquirer: For creating command-line interfaces.
PostgreSQL: Relational database for storing employee data.
pg: Node.js PostgreSQL client for interacting with the database.
Copilot, ChatGPT

# License
This project is licensed under the MIT License. See the LICENSE file for details.

# Contributing
Contributions are welcome! Please feel free to submit a Pull Request if you have any improvements or bug fixes.

# GitHub Links
- GitHub: Colby04
- Email: cjcodes2024@gmail.com
- Repo link: https://github.com/Colby04/Challenge-10-Employee-Tracker.git
