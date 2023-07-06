import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: {sub:number,email:string}) {
    const data = { id: payload.sub, email: payload.email };
    // const userDto = new LoginUserDto();
    // userDto.where = data;
    const user = await this.userService.findByCond(data);
  
    if (!user) {
      throw new UnauthorizedException("huli tut delaesh chert");
    }
  
    return {
      id : user.id,
      email : user.email,
      createdAt: user.createdAt,
      updatedAt:user.updatedAt};
  }
}