import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsUUID, MaxLength } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity('Setting')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsUUID()
  id: string = uuidv4();

  @Column()
  @IsString()
  @MaxLength(500)
  key!: string;

  @Column()
  @IsString()
  @MaxLength(500)
  value!: string;
}
