const ApiError = require("../error/ApiError.js");
const { Appointment, Service, User } = require("../models/models.js");

class AppointmentController {
  async create(req, res) {
    try {
      const { user_id, service_id, employee_id, datetime, vehicle_id } = req.body;

      if (vehicle_id == "") throw Error;

      const appointment = await Appointment.create({
        date: datetime,
        employee_id,
        service_id,
        user_id,
        status: "Pending"
      });

      return res.json(appointment);
    } catch (err) {
      if (err.status === 400) {
        return res.status(err.status).json({ message: err.message });
      } else {
        return res.status(500).json({ message: err.message });
      }
    }
  }

  async getAll(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          { model: User, attributes: ['username', 'email'] },
          { model: Service, attributes: ['name', 'price'] }
        ],
      });

      res.json(appointments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateById(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      await appointment.update({ status });
      res.json(appointment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  async deleteById(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      await appointment.destroy();
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async fetchPendingAppointments(req, res) {
    try {
      const pendingAppointments = await Appointment.findAll({
        where: {
          status: 'PENDING',
        },
        include: [
          {
            model: Service,
            attributes: ['service_name'],
          },
          {
            model: User,
            attributes: ['first_name', 'last_name', 'email'],
          },
        ],
      });

      return res.json(pendingAppointments);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new AppointmentController();
