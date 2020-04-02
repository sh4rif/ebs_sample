import { DataTypes, Model } from "sequelize";

export class Address extends Model {
    static init(connection) {
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING
        }, {
            sequelize: connection,
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

// Address.belongsTo(User)
