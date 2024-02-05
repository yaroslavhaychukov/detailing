const { Vehicle, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class VehicleController {
  async create(req, res, next) {
    try {
      const { make, model, year, user_id } = req.body;

      const user = await User.findByPk(user_id);
      if (!user) {
        return next(ApiError.notFound("User not found"));
      }

      const vehicle = await Vehicle.create({ make, model, year, user_id });

      return res.json(vehicle);
    } catch (error) {
      console.log(error)
    }
  }

  async getAllForUser(req, res, next) {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return next(ApiError.notFound(`User with id ${userId} not found`));
      }

      const userVehicles = await user.getVehicles();

      res.json(userVehicles);
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {

      const vehicle = await Vehicle.findOne({
        where: {
          id
        },
      });

      if (!vehicle) {
        return next(ApiError.notFound(`Vehicle with id ${id} not found for user ${id}`));
      }

      await Vehicle.destroy({
        where: {
          id
        },
      });

      return res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  }

  async edit(req, res, next) {
    const { id, make, model, year } = req.body;

    try {
      const vehicle = await Vehicle.findByPk(id);

      if (!vehicle) {
        throw ApiError.notFound(`Vehicle with ID ${id} not found.`);
      }

      vehicle.make = make;
      vehicle.model = model;
      vehicle.year = year;

      await vehicle.save();

      res.json({ message: 'successfully edited' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VehicleController();
