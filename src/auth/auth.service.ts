import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({
      email,
      password
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwt(data: {id:number,email:string}){
    const payload = {email: data.email, sub: data.id }
    return this.jwtService.sign(payload)
  }

  async login(user: User) {
    const {password, ...userData} = user;
    const payload = { username: user.email, sub: user.id };
    return {
      ...userData,
      access_token: this.generateJwt(userData),
    };
  }

  async registr(dto: CreateUserDto) {
    try{
      const {password, ...user} = await this.userService.create(dto);
      return {
        ...user,
        access_token: this.generateJwt(user),
      };
    }
    catch(err){
      throw new ForbiddenException(err)
    }
  }
}
