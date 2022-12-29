import Cart from "src/cart/entities/cart.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Product {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public u_id: number;

    @Column()
    public p_name: string;

    @Column()
    public price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Cart, cart => cart.product)
    public carts: Cart[];
}
export default Product;