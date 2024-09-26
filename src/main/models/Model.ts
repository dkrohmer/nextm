import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
} from 'typeorm';
import { IsUUID, IsDate, IsString, MaxLength } from 'class-validator';

import { v4 as uuidv4 } from 'uuid';
import { Increment } from './Increment';
import { Version } from './Version';

@Entity('Model')
export class Model {
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

  @OneToMany(() => Version, (version) => version.model, { cascade: true })
  versions!: Relation<Version[]>;

  @ManyToOne(() => Increment, (increment) => increment.models, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'incrementId' })
  increment!: Relation<Increment>;

  @Column()
  @IsString()
  @IsUUID()
  incrementId!: string;

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      versions: this.versions
        ? this.versions.map((version) => version.toJSON())
        : [],
    };
  }
}
