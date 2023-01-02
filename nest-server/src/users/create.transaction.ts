import { Injectable } from "@nestjs/common";
import Balance from "src/users/entities/balance.entity";
import User, { Address, userRole } from "src/users/entities/user.entity";
import {  EntityManager } from "typeorm";
import { BaseTransaction } from "./base.transaction";

export interface UserData {
    name: string;
    email: string;
    password: string;
    role: userRole.CONSUMER;
    address: Address;
}

export interface UserWithBalance{
    userId: number;
    balanceId: number;
}

@Injectable()
export class CreateTransaction extends BaseTransaction<UserData, UserWithBalance> {

    protected async execute( data: UserData, manager: EntityManager ): Promise<UserWithBalance>{
        const newUser = manager.create(User, data);
        await manager.save(newUser);
        let userBalance;
        if(newUser.role==='consumer'){
            userBalance = manager.create(Balance, {userId: newUser.id})
            await manager.save(userBalance)
        }
         return {
              userId: newUser.id,
              balanceId: userBalance.id
         }
}
}