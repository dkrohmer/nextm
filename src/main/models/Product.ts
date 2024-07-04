import { 
  Column, 
  CreateDateColumn,
  Entity, 
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn, 
  Relation
} from 'typeorm';
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
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'datetime', nullable: true })
  startsAt!: Date | null;

  @Column({ type: 'datetime', nullable: true })
  endsAt!: Date | null;

  @OneToMany(() => Responsible, responsible => responsible.product, { cascade: true })
  responsibles!: Relation<Responsible[]>;

  @OneToMany(() => Increment, increment => increment.product, { cascade: true })
  increments!: Relation<Increment[]>;

  latestIncrementId?: string | null;

  // Method to convert dates to strings
  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      startsAt: this.startsAt ? this.startsAt.toISOString() : null,
      endsAt: this.endsAt ? this.endsAt.toISOString() : null,
      increments: this.increments ? this.increments.map(increment => increment.toJSON()) : [],
    };
  }
}