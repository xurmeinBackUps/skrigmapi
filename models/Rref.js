module.exports = (sequelize, DataType) => {
    const Rref = sequelize.define('rref', {
        rref_id:{
            type: DataType.STRING
        },
        topic:{
            type: DataType.STRING,
            foreignKey: true,
            allowNull: false
        }
    }, { timestamps: false });
    Rref.associate = panel => {
        Rref.belongsTo(panel, {
            as: 'section',
            foreignKey: 'topic',
            targetKey: 'panel_id'
        });
    };
    Rref.associate = rule => {
        Rref.belongsToMany(rule, {
            through: 'rule_sheets',
            as: 'cases',
            foreignKey: 'rule_id',
            sourceKey: 'topic'
        });
    };
    Rref.associate = def => {
        Rref.belongsToMany(def, {
            through: 'definition_lists',
            as: 'definitions',
            foreignKey: 'def_id',
            sourceKey: 'topic'
        });
    };
    return Rref
};