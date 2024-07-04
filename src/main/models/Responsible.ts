import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Product } from './Product';

@Entity('Responsible')
export class Responsible {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: 'text', nullable: true })
  role!: string | null;

  @ManyToOne(() => Product, (product) => product.responsibles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Relation<Product>;

  @Column()
  productId!: string;
}
