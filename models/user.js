module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user' , {
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        handle: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        bio: {
            type: DataTypes.STRING, 
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    });

    User.associate = (models) => {

        // 1:M for User - Post relationship 
        User.hasMany(models.Post), {
            foreignKey: 'userId'
        };

        // 1:M for User - Comment Relationship 
        User.hasMany(models.Comment, {
            foreignKey: 'userId'
        }); 
    };

}