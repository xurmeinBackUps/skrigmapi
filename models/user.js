module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
        id:{
            type: DataType.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        username:{
            type: DataType.STRING,
            primaryKey: true,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password:{
            type: DataType.STRING,
            validate: {
                notEmpty: true,
                contains: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/i       
            }
        }
    }, { timestamps: false });

    User.associate = panel => {
        User.hasMany(panel, {
            foreignKey: 'GM',
            sourceKey: 'username'
        });
    };
    return User
};