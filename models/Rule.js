module.exports = (sequelize, DataType) => {
    const Rule = sequelize.define('rule', {
        rule_id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text:{
            type: DataType.STRING,
            allowNull: false,
        },
        effect:{
            type: DataType.STRING,
            allowNull: false
        }
    });
    Rule.associate = (models) => {
        Rule.belongsTo(models.Rref, {
            foreignKey: 'rule_id',
            targetKey: 'rref_id'
        });
    }
    return Rule
};