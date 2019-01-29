module.exports = (sequelize, DataType) => {
    const Def = sequelize.define('def', {
        def_id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        thing:{
            type: DataType.STRING,
            allowNull: false,
        },
        details:{
            type: DataType.TEXT,
            allowNull: false
        }
    });
    Def.associate = (models) => {
        Def.belongsTo(models.Rref, {
            foreignKey: 'def_id',
            targetKey: 'rref_id'
        });
    }
    return Def
};