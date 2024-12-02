import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductOrder } from '../types';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class Order extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  totalPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  totalQuantity: number;

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
  })
  items: ProductOrder[];
}
