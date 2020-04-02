import { DataTypes, Model } from "sequelize";
import { BCRYPT_WORK_FACTOR } from "../../config";
import { hash } from "bcryptjs";

export class User extends Model {
  static init(connection) {
    super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        level: DataTypes.TINYINT,
        isActive: DataTypes.TINYINT,
        isAadmin: DataTypes.TINYINT
      },
      {
        sequelize: connection,
        tableName: "users",
        hooks: {
          beforeCreate: async (user, options) => {
            const hashedPassword = await hash(
              user.password,
              BCRYPT_WORK_FACTOR
            );
            user.password = hashedPassword;
          }
        }
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
    this.belongsToMany(models.Tech, {
      foreignKey: "user_id",
      through: "user_techs",
      as: "techs"
    });
  }
}

export default User;
