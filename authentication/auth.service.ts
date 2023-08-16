import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { loginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { RegisterusersDto } from "./dto/register-user.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuthService{
    constructor(
        private readonly prismaService: PrismaService, 
        private jwtService: JwtService, 
        private readonly userService:UserService){}

        async login(loginDto: loginDto): Promise<any>{
            const {username, password} = loginDto;

            const users = await this.prismaService.user.findUnique({
                where: {username}
            })
            if (!users){
                throw new NotFoundException('User not found')
            }

            const validatePassword = await bcrypt.compare(password, users.password)
            if (!validatePassword){
                throw new NotFoundException('Invalid password')
            }

            return{
                token: this.jwtService.sign({username})
            }
        }

        async register (createDto: RegisterusersDto): Promise<any>{
            const createUsers = new User()
            createUsers.firstName = createDto.firstName
            createUsers.lastName = createDto.lastName
            createUsers.email = createDto.email
            createUsers.password = await bcrypt.hash(createDto.password, 10)

            const user = await this.userService.createUser(createUsers)
            return{
                token: this.jwtService.sign({username: user.username})
            }
        }
    }