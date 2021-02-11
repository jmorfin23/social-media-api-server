module.exports = (sequelize, DataTypes) => {


    const Post = sequelize.define('post' , {
        id: {
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        body: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        likes: {
            type: DataTypes.INTEGER, 
            defaultValue: 0
        }
    });

    Post.associate = (models) => {

        // 1:M for Post - Comment relationship 
        Post.hasMany(models.comment), {
            foreignKey: 'postId'
        };

        // 1:M for User - Post Relationship 
        Post.belongsTo(models.user, {
            foreignKey: 'userId'
        }); 
    };

    return Post; 
}; 