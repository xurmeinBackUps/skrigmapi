module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
        username:{
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        password:{
            type: DataType.STRING,
            allowNull: false
        },
    });
    User.associate = (models) => {
        User.hasMany(models.Panel, {
            as: 'screens',
            foreignKey: 'panel_id',
            sourceKey: 'username'
        });
    }
    return User
};