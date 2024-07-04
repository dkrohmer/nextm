import { 
  CreateDateColumn,
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToMany, 
  JoinColumn,
  Relation
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Increment } from './Increment';
import { Version } from './Version';

@Entity('Model')
export class Model {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  name!: string;

  @OneToMany(() => Version, version => version.model, { cascade: true })
  versions!: Relation<Version[]>;

  @ManyToOne(() => Increment, increment => increment.models, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'incrementId'})
  increment!: Relation<Increment>;

  @Column()
  incrementId!: string;

   // Method to convert dates to strings
  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      versions: this.versions ? this.versions.map(version => version.toJSON()) : [], 
    };
  }
}