import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtTokenService: JwtService){}

    async loginWithCredentials(loginDto: LoginDto): Promise<any>{
         const { email } = loginDto;
         const user: User[] = await this.userService.findOne(email);
         if (!user) {
            throw new HttpException('user not exists', HttpStatus.BAD_REQUEST);
          }
          
          const payload = {
                id: user[0].id,
                email: user[0].email,
                role: user[0].role
          }
         return {
            access_token: this.jwtTokenService.sign(payload)
         };
    }
}
