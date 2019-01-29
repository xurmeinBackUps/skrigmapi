module.exports = (sequelize, DataType) => {
    const Rref = sequelize.define('rref', {
        rref_id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        topic:{
            type: DataType.STRING,
            allowNull: false
        }
    });
    Rref.associate = (models) => {
        Rref.belongsTo(models.Panel, {
            foreignKey: 'rref_id',
            targetKey: 'panel_id'
        });
        Rref.hasMany(models.Rule, {
            as: 'cases',
            foreignKey: 'rule_id',
            sourceKey: 'rref_id'
        });
        Rref.hasMany(models.Def, {
            as: 'definitions',
            foreignKey: 'def_id',
            sourceKey: 'rref_id'
        });
    }
    return Rref
};