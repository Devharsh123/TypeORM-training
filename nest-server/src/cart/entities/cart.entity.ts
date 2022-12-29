import Product from "src/products/entities/product.entity";
import User from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Cart {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public p_id:number;

    @Column()
    public consumer_id: number;

    @Column({default: false})
    public isPurchased: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>User, user => user.carts)
    public user: User;

    @ManyToOne(()=>Product, product => product.carts)
    public product: Product;
}

export default Cart;
