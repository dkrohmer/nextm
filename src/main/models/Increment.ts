import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, 
  Relation
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Product } from './Product';
import { Model } from './Model';

@Entity('Increment')
export class Increment {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  name!: string;

  @OneToMany(() => Model, model => model.increment, { cascade: true})
  models!: Relation<Model[]>;

  @ManyToOne(() => Product, product => product.increments, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'productId'})
  product!: Relation<Product>;

  @Column()
  productId!: string;

  @Column()
  incrementIndex!: number;

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      models: this.models ? this.models.map(model => model.toJSON()) : [], 
    };
  }
}