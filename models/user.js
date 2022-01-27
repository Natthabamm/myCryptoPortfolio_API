module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', 
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            underscored: true
        }
    );

    User.associate = models => {
        User.hasMany(models.Transaction, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
    };

    return User;
};