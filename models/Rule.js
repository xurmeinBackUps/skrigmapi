module.exports = (sequelize, DataType) => {
    const Rule = sequelize.define('rule', {
        rule_id:{
            type: DataType.STRING
        },
        text:{
            type: DataType.STRING,
            allowNull: false,
        },
        effect:{
            type: DataType.STRING,
            allowNull: false
        }
    }, { timestamps: false });
    Rule.associate = rref => {
        Rule.belongsToMany(rref, {
            through: 'rule_sheets',
            foreignKey: 'rule_id',
            targetKey: 'topic'
        });
    }
    return Rule
};