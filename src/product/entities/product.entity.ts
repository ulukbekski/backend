import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  // @Column()
  // image: string;

  // @Column()
  // brand: string;

  @Column()
  price: number;

  @Column({default:0})
  views: number;

  @Column()
  category: string;

  @CreateDateColumn( {type: 'timestamp'} )
  createdAt: Date;

  @UpdateDateColumn( {type:'timestamp'})
  updatedAt: Date;
}
