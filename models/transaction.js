module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction', 
        {
            transactionType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'BUY',
                validate: {
                    isIn: [['BUY', 'SELL']]
                }
            },
            coinName: { 
                type: DataTypes.STRING,
                allowNull: false
            },
            quanity: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            pricePerCoin: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            totalSpent: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            time: {
                type: DataTypes.TIME,
                allowNull: false
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false
            }
            
        },
        {
            underscored: true,
            timestamps: false
        }
    );

    Transaction.associate = models => {
        Transaction.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
    };
    
    return Transaction;
};