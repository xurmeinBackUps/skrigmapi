module.exports = (sequelize, DataType) => {
    const Panel = sequelize.define('panel', {
        panel_id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataType.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    Panel.associate = (User) => {
        Panel.belongsTo(User, {
            foreignKey: 'username'
        });
        // Panel.hasMany(models.Rref, {
        //     as: 'section',
        //     foreignKey: ['rref'],
        // });
    };
    return Panel
};