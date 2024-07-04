import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('Setting')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  key!: string;

  @Column()
  value!: string;
}
