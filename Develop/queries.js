const client = require('./db');

class Database {
  static async getDepartments() {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
  }

  static async getRoles() {
    const res = await client.query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    return res.rows;
  }

  static async getEmployees() {
    const res = await client.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    return res.rows;
  }

  static async addDepartment(name) {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
  }

  static async addRole(title, salary, department_id) {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  }

  static async addEmployee(first_name, last_name, role_id, manager_id) {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  }

  static async updateEmployeeRole(employee_id, role_id) {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  }
}

module.exports = Database;