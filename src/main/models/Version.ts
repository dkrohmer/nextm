import { Model } from './Model';
import { IsDataUriPng } from '../helpers/isDataUriPng';
import { IsJsonString } from '../helpers/isJsonString';
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
import {
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@Entity('Version')
export class Version {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  id: string = uuidv4();

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @IsString()
  @MaxLength(Number.MAX_SAFE_INTEGER)
  @IsJsonString()
  payload!: string;

  @ManyToOne(() => Model, (model) => model.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'modelId' })
  model!: Relation<Model>;

  @Column()
  @IsString()
  @IsUUID()
  modelId!: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  versionIndex!: number;

  @Column()
  @IsString()
  @MaxLength(Number.MAX_SAFE_INTEGER)
  @IsDataUriPng()
  thumbnail!: string;

  @Column({ type: 'float', nullable: true })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  x!: number | null;

  @Column({ type: 'float', nullable: true })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  y!: number | null;

  @Column({ type: 'float', nullable: true })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  height!: number | null;

  @Column({ type: 'float', nullable: true })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  width!: number | null;

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
