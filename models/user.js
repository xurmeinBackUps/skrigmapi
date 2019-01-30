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
        }
    }, { timestamps: false });

    // User.associate = (Panel) => {
    //     User.hasMany(Panel, {
    //         as: 'GM',
    //         foreignKey: 'username'
    //     });
    // };
    return User
};