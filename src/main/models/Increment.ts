import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import {
  IsUUID,
  IsDate,
  IsString,
  MaxLength,
  Min,
  Max,
  IsInt
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './Product';
import { Model } from './Model';

@Entity('Increment')
export class Increment {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @IsString()
  @MaxLength(250)
  name!: string;

  @OneToMany(() => Model, (model) => model.increment, { cascade: true })
  models!: Relation<Model[]>;

  @ManyToOne(() => Product, (product) => product.increments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Relation<Product>;

  @Column()
  @IsString()
  @IsUUID()
  productId!: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(10000)
  incrementIndex!: number;

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      models: this.models ? this.models.map((model) => model.toJSON()) : [],
    };
  }
}
