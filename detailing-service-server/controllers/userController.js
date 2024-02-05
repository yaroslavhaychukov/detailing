const ApiError = require("../error/ApiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Appointment, Service, Employee, Favorite } = require("../models/models");

const generateJwt = (id, role) => {
  return jwt.sign(
    {
      user_id: id,
      role: role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "12h",
    }
  );
};

class UserController {
  async registration(req, res, next) {
    try {
      const { password, email, username } = req.body;

      if (!password || !email || !username) {
        return next(
          ApiError.badRequest("Role, password, and email are required")
        );
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest("email is in use"));
      }

      const hashedPassword = await bcrypt.hash(password, 5);

      let user;
      user = await User.create({
        role: "User",
        password: hashedPassword,
        username,
        email: email,
      });
      const token = generateJwt(user.id, user.role);

      res.json({ token });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest("Email and password are required"));
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return next(ApiError.notFound("user not found"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Password mismatch"));
      }

      const token = generateJwt(user.id, user.role);

      res.json({ token });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getInfo(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: ['username', 'email'],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user information:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllUserAppointments(req, res, next) {
    try {
      const userId = req.params.userId;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userAppointments = await Appointment.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Service
          },
          {
            model: Employee
          },
        ],
      });

      return res.status(200).json(userAppointments);
    } catch (error) {
      console.error('Error fetching user appointments:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async toggleFavorites(req, res, next) {
    const { serviceId } = req.params;
    const { user_id } = req.user;
    console.log(req.user)

    try {
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const service = await Service.findByPk(serviceId);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const favorite = await Favorite.findOne({
        where: { user_id: user_id, service_id: serviceId },
      });

      if (favorite) {
        await favorite.destroy();
        res.json({ message: 'Service unfavorited successfully' });
      } else {
        await Favorite.create({ user_id: user_id, service_id: serviceId });
        res.json({ message: 'Service favorited successfully' });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();