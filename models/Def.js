module.exports = (sequelize, DataType) => {
    const Def = sequelize.define('def', {
        def_id:{
            type: DataType.STRING
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
    Def.associate = rref => {
        Def.belongsToMany(rref, {
            through: 'definition_lists',
            foreignKey: 'def_id',
            targetKey: 'topic'
        });
    }
    return Def
};