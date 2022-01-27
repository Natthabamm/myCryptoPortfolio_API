module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction', 
        {
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
            datetime: {
                type: DataTypes.DATE
            }
            
        },
        {
            underscored: true
        }
    );

    Transaction.associate = models => {
        Transaction.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });

        Transaction.hasMany(models.TransactionType, {
            foreignKey: {
                name: 'transactionTypeId',
                allowNull: false
            }
        });
    };
    
    return Transaction;
};