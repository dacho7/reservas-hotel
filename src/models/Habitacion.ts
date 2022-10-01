import { DataTypes, Model, Sequelize } from "sequelize";

class Habitacion extends Model {
  public id_hab!: string;
  public servicios!: string;
  public descripcion!: string;
  public costo!: number;
  public estado!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id_hab: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        servicios: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        estado: DataTypes.STRING,
        costo: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

export default Habitacion;
