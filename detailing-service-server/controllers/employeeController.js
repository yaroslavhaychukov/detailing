const { Employee } = require("../models/models");
const ApiError = require("../error/ApiError");

class EmployeeController {
  async getAllEmployees(req, res, next) {
    try {
      const employees = await Employee.findAll();
      res.json(employees);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAllAvailableEmployees(req, res, next) {
    try {
      const availableEmployees = await Employee.findAll({
        where: {
          employee_id: {
            [Employee.sequelize.Sequelize.Op.notIn]: Employee.sequelize.literal(
              '(SELECT employee_id FROM "Appointments")'
            ),
          },
        },
      });

      res.json(availableEmployees);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async createEmployee(req, res, next) {
    const {
      first_name,
      last_name,
      phone,
      hourly_rate,
    } = req.body;
    try {
      const newEmployee = await Employee.create({
        first_name,
        last_name,
        phone,
        hourly_rate,
      });
      res.status(201).json(newEmployee);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async updateEmployee(req, res, next) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone,
      hourly_rate,
    } = req.body;
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return next(ApiError.notFound("Employee not found"));
      }
      await employee.update({
        first_name,
        last_name,
        phone,
        hourly_rate,
      });
      res.json(employee);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteEmployee(req, res, next) {
    const { id } = req.params;
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return next(ApiError.notFound("Employee not found"));
      }
      await employee.destroy();
      res.sendStatus(204);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new EmployeeController();
