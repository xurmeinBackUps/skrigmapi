module.exports = (sequelize, DataType) => {
    const Panel = sequelize.define('panel', {
        panel_id:{
            type: DataType.STRING
        },
        title:{
            type: DataType.STRING,
            notEmpty: true
        },
        GM:{
            type: DataType.STRING
        }
    }, { timestamps: false });

    Panel.associate = user => {
        Panel.belongsTo(user, {
            foreignKey: 'GM',
            targetKey: 'username'
        });
    }
    Panel.associate = rref => {
        Panel.hasMany(rref, {
            foreignKey: 'topic',
            sourceKey: 'panel_id'
        });
    };
    return Panel
};