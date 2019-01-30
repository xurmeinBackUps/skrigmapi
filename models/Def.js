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
    }, { timestamps: false });
    Def.associate = (Rref) => {
        Def.belongsTo(Rref, {
            foreignKey: 'rref_id'
        });
    }
    return Def
};