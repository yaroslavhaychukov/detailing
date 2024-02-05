const { ServiceCategory } = require('../models/models');
const ApiError = require('../error/ApiError')

class UtilsController {
    async getAllCategories(req, res) {
        try {
            const serviceCategory = await ServiceCategory.findAll();
            res.json(serviceCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteCategory(req, res, next) {
        const { id } = req.params;

        try {
            const deletedRowCount = await ServiceCategory.destroy({
                where: { id },
            });

            if (deletedRowCount === 0) {
                throw ApiError.notFound("Service category not found");
            }

            return res.json({ message: "Service category deleted successfully" });
        } catch (err) {
            if (err instanceof ApiError) {
                return res.status(err.status).json({ message: err.message });
            } else {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const serviceCategory = await ServiceCategory.create(
                {
                    name,
                },
            );
            return res.json(serviceCategory);
        } catch (err) {
            if (err.status === 400) {
                return res.status(err.status).json({ message: err.message });
            } else {
                return res.status(500).json({ message: err });
            }
        }
    }
}

module.exports = new UtilsController();