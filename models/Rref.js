module.exports = (sequelize, DataType) => {
    const Rref = sequelize.define('rref', {
        panel_id:{
            type: DataType.STRING
        },
        topic:{
            type: DataType.STRING,
            foreignKey: true,
            allowNull: false
        }
    }, { timestamps: false });
    Rref.associate = (panel, rule, def) => {
        Rref.belongsTo(panel, {
            as: 'section',
            foreignKey: 'topic',
            targetKey: 'panel_id'
        });
        Rref.belongsToMany(rule, {
            through: 'rule_sheets',
            as: 'cases',
            foreignKey: 'rule_id',
            sourceKey: 'topic'
        });
        Rref.belongsToMany(def, {
            through: 'definition_lists',
            as: 'definitions',
            foreignKey: 'def_id',
            sourceKey: 'topic'
        });
    };
    return Rref
};