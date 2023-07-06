import { IsEmail, Length } from "class-validator";
import { UniqueOnDatabase } from "src/auth/uniqueValidation";
import { User } from "../entities/user.entity";

export class CreateUserDto {
    fullName:string;

    @IsEmail(undefined,{message:"Неверная почта!"})
    email:string;
    
    @Length(6,32,{ message: "Пароль должен быть минимум 6 символов"})
    password?:string; 
}
    export class LoginUserDto {
    @IsEmail(undefined,{message:"Неверная почта!"})
    @UniqueOnDatabase(User, {
        message:'Такой аккаунт уже есть'
    })
    email:string;
    
    @Length(6,32,{ message: "Пароль должен быть минимум 6 символов"})
    password?:string;
  
    // where?: { id: number; email: string };
  }
  
