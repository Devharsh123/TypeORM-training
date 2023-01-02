import Cart from "src/cart/entities/cart.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export enum userRole {
    ADMIN = 'admin',
    MANUFACTURER = 'manufacturer',
    CONSUMER = 'consumer'
}

export interface Address {
    houseAdress: string
    city: string;
    state: string;
    country: string;
    pincode: number;
}

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({
        unique: true
    })
    public email: string;

    @Column()
    public password: string;

    @Column({
        type: "enum",
        enum: userRole,
        default: userRole.CONSUMER
    })
    role: userRole;

    @Column("simple-json")
    address: Address;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Cart, cart => cart.user)
    public carts: Cart[];
}

export default User;