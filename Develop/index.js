const inquirer = require('inquirer');
const Database = require('./queries');

async function main() {
  const choices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
  ];

  const { action } = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices,
  });

  switch (action) {
    case 'View all departments':
      const departments = await Database.getDepartments();
      console.table(departments);
      break;

    case 'View all roles':
      const roles = await Database.getRoles();
      console.table(roles);
      break;

    case 'View all employees':
      const employees = await Database.getEmployees();
      console.table(employees);
      break;

    case 'Add a department':
      const { departmentName } = await inquirer.prompt({
        name: 'departmentName',
        type: 'input',
        message: 'Enter the name of the department:',
      });
      await Database.addDepartment(departmentName);
      console.log('Department added.');
      break;

    case 'Add a role':
      const { roleName, roleSalary, roleDepartmentId } = await inquirer.prompt([
        { name: 'roleName', type: 'input', message: 'Enter the name of the role:' },
        { name: 'roleSalary', type: 'input', message: 'Enter the salary of the role:' },
        { name: 'roleDepartmentId', type: 'input', message: 'Enter the department ID for the role:' },
      ]);
      await Database.addRole(roleName, roleSalary, roleDepartmentId);
      console.log('Role added.');
      break;

    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { name: 'firstName', type: 'input', message: 'Enter the first name of the employee:' },
        { name: 'lastName', type: 'input', message: 'Enter the last name of the employee:' },
        { name: 'roleId', type: 'input', message: 'Enter the role ID for the employee:' },
        { name: 'managerId', type: 'input', message: 'Enter the manager ID for the employee (leave blank if none):', default: null },
      ]);
      await Database.addEmployee(firstName, lastName, roleId, managerId);
      console.log('Employee added.');
      break;

    case 'Update an employee role':
      const employeesList = await Database.getEmployees();
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          name: 'employeeId',
          type: 'list',
          message: 'Select the employee to update:',
          choices: employeesList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
        },
        { name: 'newRoleId', type: 'input', message: 'Enter the new role ID for the employee:' },
      ]);
      await Database.updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated.');
      break;
  }

  main(); // Restart the application
}

main();