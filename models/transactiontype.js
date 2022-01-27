module.exports = (sequelize, DataTypes) => {
    const TransactionType = sequelize.define(
        'TransactionType', 
        {
            transactionTypeName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'BUY',
                validate: {
                    isIn: [['BUY', 'SELL']]
                }
            }
        },
        {
            underscored: true
        }
    );

    TransactionType.associate = models => {
        TransactionType.hasMany(models.Transaction, {
            foreignKey: {
                name: 'transactionTypeId',
                allowNull: false
            }
        });
    };

    return TransactionType;
};