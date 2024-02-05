const { Service, ServiceCategory, Review, User, Appointments, Favorite } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require('uuid')
const path = require('path')

class ServiceController {
  async create(req, res) {
    try {
      const {
        name,
        category_id,
        description,
        price
      } = req.body;

      const { image } = req.files
      let fileName = uuid.v4() + ".jpg"
      image.mv(path.resolve(__dirname, '..', 'static', fileName))

      const service = await Service.create({
        name,
        category_id,
        description,
        price,
        image: fileName
      });
      return res.json(service);
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
      const { user_id } = req.user;
      const userFavorites = await Favorite.findAll({
        where: { user_id: user_id },
        attributes: ['service_id'],
      });

      const favoriteServiceIds = userFavorites.map((favorite) => favorite.service_id);

      const services = await Service.findAll({
        include: ServiceCategory,
      });

      const servicesWithFavorites = services.map((service) => ({
        ...service.toJSON(),
        isFavorited: favoriteServiceIds.includes(service.id),
      }));

      return res.json(servicesWithFavorites);
    } catch (err) {
      console.error('Error fetching services:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return next(ApiError.notFound('Service not found'));
      }
      res.json(service);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getReviews(req, res, next) {
    const { id } = req.params;

    try {
      const reviews = await Review.findAll({
        where: { service_id: id },
        include: [
          {
            model: User,
            attributes: ['id', 'username'],
          },
        ],
      });

      res.json(reviews);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async deleteReview(req, res, next) {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);
      if (!review) {
        throw ApiError.notFound(`Review with id ${id} not found`);
      }

      await review.destroy();

      res.status(204).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
    }
  }

  async addReview(req, res, next) {
    try {
      const { user_id, rating, comment, service_id } = req.body;

      const user = await User.findByPk(user_id);
      if (!user) {
        throw ApiError.notFound(`User with id ${user_id} not found`);
      }

      const newReview = await Review.create({
        service_id,
        user_id,
        rating,
        comment,
      });

      res.json(newReview);
    } catch (error) {
      console.error(error);
    }
  }

  async updateId(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        price
      } = req.body;

      const [updatedRows] = await Service.update(
        {
          name,
          description,
          price
        },
        { where: { id } }
      );

      if (updatedRows === 0) {
        throw ApiError.notFound('Service not found');
      }

      const updatedService = await Service.findByPk(id);
      return res.json(updatedService);
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async deleteId(req, res) {
    try {
      const { id } = req.params;
      const deletedRows = await Service.destroy({ where: { id } });

      if (deletedRows === 0) {
        throw ApiError.notFound('Service not found');
      }

      return res.json({ message: 'Service deleted successfully' });
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}
module.exports = new ServiceController();
