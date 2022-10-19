import inquirer from 'inquirer';
import createConnection from 'mysql2';
//import asciiartlogo from 'asciiart';

const db = createConnection.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'buttfutt7',
        database: 'employees'
    },
    console.log('Connected to the inventory_db database.'),
).promise();

const mainMenu = async () => {
    const promptValue = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add an employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update an employee',
                    value: 'UPDATE_EMPLOYEE'
                },
                {
                    name: 'Exit',
                    value: 'EXIT'
                }
            ]
        }
    ])

    console.log(promptValue);

    switch (promptValue.choice){
        case 'VIEW_EMPLOYEES':
            viewEmployees();
            break;
        case 'VIEW_DEPARTMENTS':
            viewDepartments();
            break;
        case 'VIEW_ROLES':
            viewRoles();
            break;
        case 'ADD_EMPLOYEE':
            addEmployeePrompt();
            break;
        case 'ADD_DEPARTMENT':
            addDepartments();
            break;
        case 'ADD_ROLE':
            addRoles();
            break;
        case 'UPDATE_EMPLOYEE':
            updateEmployee();
            break;
        case 'EXIT':
            process.exit();
        default:
            process.exit();
    }
};

const viewEmployees = async () => {
    const [employeeData] = await db.query("SELECT * FROM employee");
    console.log(employeeData);
};

const viewDepartments = async () => {
    const [departmentData] = await db.query("SELECT * FROM department");
    console.log(departmentData);
}
const viewRoles = async () => {
    const [roleData] = await db.query("SELECT * FROM role");
    console.log(roleData);
}

const addEmployee = async (fName, lName, role, manager) => {
    const [roleID] = await db.query("SELECT id FROM role WHERE title='" + role + "'");
    const [manID] = await db.query("SELECT id FROM employee WHERE first_name='" + fName + "' AND last_name='" + lName + "'");
    const [addEmData] = await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                                            VALUES (` + fName + `,` + lName + `,` + roleID + `,` + manID + `)`);
    console.log(roleID, manID, addEmData);
}

const addEmployeePrompt = async () => {
    var first, last, role, manager;
    const promptValue = await inquirer.prompt([
        {
            name: first,
            message: 'Enter Employee First Name: '
        },
        {
            name: last,
            message: 'Enter Employee Last Name: '
        },
        {
            name: role,
            message: 'Enter Role: '
        },
        {
            name: manager,
            message: 'Enter Manager (First + Last Name): '
        }
    ])
    .then(() => {
        console.info('Answer:', first);
    });

    console.log(promptValue);

    addEmployee(first, last, role, manager);
}

const addDepartment = async () => {
    const departmentData = await db.query("SELECT * FROM role");
    console.log(employeeData);
}

const addRole = async () => {
    const departmentData = await db.query("SELECT * FROM role");
    console.log(employeeData);
}

const updateEmployee = async (firstName, lastName, roleId, managerId) => {
    const departmentData = await db.query("UPDATE (" + name + "FROM employee");
    console.log(employeeData);
}

await mainMenu();