import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import {
  IsUUID,
  IsDate,
  IsString,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Responsible } from './Responsible';
import { Increment } from './Increment';

export interface ResponsibleInput {
  firstName: string;
  lastName: string;
  role?: string;
}

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @IsString()
  @MaxLength(250)
  @IsNotEmpty({ message: 'Product name must not be empty' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description!: string | null;

  @Column({ type: 'datetime', nullable: true })
  @IsOptional()
  @IsDate()
  startsAt!: Date | null;

  @Column({ type: 'datetime', nullable: true })
  @IsOptional()
  @IsDate()
  endsAt!: Date | null;

  @OneToMany(() => Responsible, (responsible) => responsible.product, {
    cascade: true,
  })
  responsibles!: Relation<Responsible[]>;

  @OneToMany(() => Increment, (increment) => increment.product, {
    cascade: true,
  })
  increments!: Relation<Increment[]>;

  @IsOptional()
  @IsString()
  @IsUUID()
  latestIncrementId?: string | null;

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      startsAt: this.startsAt ? this.startsAt.toISOString() : null,
      endsAt: this.endsAt ? this.endsAt.toISOString() : null,
      increments: this.increments
        ? this.increments.map((increment) => increment.toJSON())
        : [],
    };
  }
}
