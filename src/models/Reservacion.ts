import { DataTypes, Model, Sequelize } from "sequelize";

class Reservacion extends Model {
  public num_reserva!: string;
  public num_hab!: string;
  public n_cliente!: string;
  public estado!: string;
  public metodo_pago!: string;
  public mon_pago!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        num_reserva: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        num_hab: DataTypes.STRING,
        n_cliente: DataTypes.STRING,
        estado: DataTypes.STRING,
        metodo_pago: DataTypes.STRING,
        mon_pago: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

export default Reservacion;
