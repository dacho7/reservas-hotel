import { DataTypes, Model, Sequelize } from "sequelize";

class Reservacion extends Model {
  public num_hab!: string;
  public n_cliente!: string;
  public estado!: string;
  public metodo_pago!: string;
  public mon_pago!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id_hab: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        servicios: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        costo: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

export default Reservacion;
