import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Model } from './Model';

@Entity('Version')
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  payload!: string;

  @ManyToOne(() => Model, (model) => model.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model!: Relation<Model>;

  @Column()
  modelId!: string;

  @Column()
  versionIndex!: number;

  @Column()
  thumbnail!: string;

  @Column({ type: 'float', nullable: true })
  x!: number | null;

  @Column({ type: 'float', nullable: true })
  y!: number | null;

  @Column({ type: 'float', nullable: true })
  height!: number | null;

  @Column({ type: 'float', nullable: true })
  width!: number | null;

  // Method to convert dates to strings
  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
