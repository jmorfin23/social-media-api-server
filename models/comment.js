module.exports = (sequelize, DataTypes) => {
    
    const Comment = sequelize.define('comment' , {
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

    Comment.associate = (models) => {

        // 1:M for Post - Comment relationship 
        Comment.belongsTo(models.post), {
            foreignKey: 'postId'
        };
        
        // 1:M for User - Comment Relationship 
        Comment.belongsTo(models.user, {
            foreignKey: 'userId'
        }); 
    };

    return Comment; 
}; 