const { Assortment } = require("../models/models");
const ApiError = require("../error/ApiError");

class AssortmentController {
  async getAllAssortments(req, res, next) {
    try {
      const assortment = await Assortment.findAll();
      res.json(assortment);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const assortment = await Assortment.findByPk(id);

      if (!assortment) {
        return next(ApiError.notFound(`Assortment with id ${id} not found`));
      }

      await assortment.destroy();
      res.json({ message: "Assortment deleted successfully" });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async edit(req, res, next) {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
      const assortment = await Assortment.findByPk(id);

      if (!assortment) {
        return next(ApiError.notFound(`Assortment with id ${id} not found`));
      }

      assortment.name = name || assortment.name;
      assortment.price = price || assortment.price;
      assortment.description = description || assortment.description;

      await assortment.save();

      res.json({ message: "Assortment updated successfully", assortment });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new AssortmentController();