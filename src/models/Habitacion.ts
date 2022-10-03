import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table
class Habitacion extends Model {
  @PrimaryKey
  @Column
  public id_hab!: string;

  @Column
  public servicios!: string;

  @Column
  public descripcion!: string;

  @Column
  public costo!: number;

  @Column
  public estado!: string;
}

export default Habitacion;
