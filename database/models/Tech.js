import { DataTypes, Model } from "sequelize";

export class Tech extends Model {
  static init(connection) {
    super.init(
      {
        title: DataTypes.STRING,
        desc: DataTypes.STRING
      },
      {
        sequelize: connection,
        tableName: "techs"
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "tech_id",
      through: "user_techs",
      as: "users"
    });
  }
}

// Address.belongsTo(User)
