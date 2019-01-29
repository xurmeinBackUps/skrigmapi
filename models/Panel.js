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
    });
    Panel.associate = (models) => {
        Panel.belongsTo(models.User, {
            foreignKey: 'panel_id',
            targetKey: 'username'
        });
        Panel.hasMany(models.Rref, {
            as: 'sections',
            foreignKey: 'rref_id',
            sourceKey: 'panel_id'
        });
    }
    return Panel
};