const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db_phongnghi123', 'db_phongnghi123_user', "LnP1B92gPOVke45UkTIcMA38QxhgUHIt", {
    host: 'dpg-cs0k8vjtq21c73eeo8cg-a.singapore-postgres.render.com',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require:true,
            rejectUnauthorized: false
        }
    }
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDatabase