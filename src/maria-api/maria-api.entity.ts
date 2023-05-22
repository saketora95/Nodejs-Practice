import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FruitPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column()
  price: number;
}