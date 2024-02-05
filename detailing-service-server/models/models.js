const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define("User", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.STRING,
	}
});

const Service = sequelize.define("Service", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.TEXT,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
	}
});

const ServiceCategory = sequelize.define("ServiceCategory", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	}
});

const Review = sequelize.define("Review", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	service_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5,
		},
	},
	comment: {
		type: DataTypes.TEXT,
	}
});

const Appointment = sequelize.define("Appointment", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM("Pending", "Confirmed", "Completed", "Cancelled"),
		defaultValue: "Pending",
	},
});

const Employee = sequelize.define("Employee", {
	employee_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	first_name: {
		type: DataTypes.STRING(50)
	},
	last_name: {
		type: DataTypes.STRING(50)
	},
	phone: {
		type: DataTypes.STRING(35)
	},
	hourly_rate: {
		type: DataTypes.NUMERIC(10, 2)
	}
});

const Vehicle = sequelize.define("Vehicle", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	make: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	model: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.INTEGER,
	},
});

const Assortment = sequelize.define('Assortment', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
});

const Favorite = sequelize.define("Favorite", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
});

User.belongsToMany(Service, { through: Favorite, foreignKey: 'user_id', onDelete: 'CASCADE' });
Service.belongsToMany(User, { through: Favorite, foreignKey: 'service_id', onDelete: 'CASCADE', });

User.hasMany(Appointment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Service.hasMany(Appointment, { foreignKey: 'service_id', onDelete: 'CASCADE' });
Service.hasMany(Review, { foreignKey: 'service_id', onDelete: 'CASCADE' });

Review.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Appointment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Appointment.belongsTo(Employee, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
Appointment.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' });

Employee.hasMany(Appointment, { foreignKey: 'employee_id', onDelete: 'CASCADE' });

User.hasMany(Vehicle, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Vehicle.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Service.belongsTo(ServiceCategory, { foreignKey: 'category_id', onDelete: 'CASCADE' });
ServiceCategory.hasMany(Service, { foreignKey: 'category_id', onDelete: 'CASCADE' });

module.exports = {
	User,
	Service,
	Review,
	Appointment,
	Employee,
	Vehicle,
	ServiceCategory,
	Assortment,
	Favorite
};