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
    }, { timestamps: false });
    Rule.associate = (Rref) => {
        Rule.belongsTo(Rref, {
            foreignKey: 'rref_id'
        });
    }
    return Rule
};