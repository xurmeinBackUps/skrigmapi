module.exports = (sequelize, DataType) => {
    const Rref = sequelize.define('rref', {
        rref_id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        topic:{
            type: DataType.STRING,
            allowNull: false
        }
    }, { timestamps: false });
    Rref.associate = (Panel) => {
        Rref.belongsTo(Panel, {
            as: 'section',
            foreignKey: 'panel_id'
        });
        // Rref.hasMany(models, {
        //     as: 'cases',
        //     foreignKey: ['rule'],
        // });
        // Rref.hasMany(models, {
        //     as: 'definitions',
        //     foreignKey: ['def']
        // });
    };
    return Rref
};