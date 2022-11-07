module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updated: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    userId: DataTypes.INTEGER,
  },
    {
      underscored: true,
      timestamps: false,
      tableName: 'blog_posts',
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return BlogPost;
};