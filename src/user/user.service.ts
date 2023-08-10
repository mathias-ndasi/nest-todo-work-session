import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  create(createUserDto: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({data: createUserDto});
  }

  getAllUser() {
    return this.prisma.user.findMany();
  }

  getSingleUser(id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data,
      where,
    }) ;
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id}});
  }
}
