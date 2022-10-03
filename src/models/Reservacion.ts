import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table
class Reservacion extends Model {
  @PrimaryKey
  @Column
  public num_reserva!: string;

  @Column
  public num_hab!: string;

  @Column
  public n_cliente!: string;

  @Column
  public estado!: string;

  @Column
  public metodo_pago!: string;

  @Column
  public mon_pago!: number;
}

export default Reservacion;
