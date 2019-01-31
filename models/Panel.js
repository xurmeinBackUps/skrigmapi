module.exports = (sequelize, DataType) => {
    const Panel = sequelize.define('panel', {
        GM:{
            type: DataType.STRING
        },
        title:{
            type: DataType.STRING,
            notEmpty: true
        },
        panel_id:{
            type: DataType.STRING
        }
    }, { timestamps: false });

    Panel.associate = (user, rref) => {
        Panel.belongsTo(user, {
            foreignKey: 'GM',
            targetKey: 'username'
        });
        Panel.hasMany(rref, {
            foreignKey: 'topic',
            sourceKey: 'id'
        });
    };
    return Panel
};