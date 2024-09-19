import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { 
  IsOptional,
  IsString,
  isUUID,
  IsUUID,
  MaxLength
} from 'class-validator';

import { v4 as uuidv4 } from 'uuid';
import { Product } from './Product';

@Entity('Responsible')
export class Responsible {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  id: string = uuidv4();

  @Column()
  @IsString()
  @MaxLength(250)
  firstName!: string;

  @Column()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  lastName!: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  role!: string | null;

  @ManyToOne(() => Product, (product) => product.responsibles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Relation<Product>;

  @Column()
  @IsString()
  @IsUUID()
  productId!: string;
}
