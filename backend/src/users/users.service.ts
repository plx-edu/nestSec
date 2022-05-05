import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async findOne(username: string, password?: string, id?: string) {
    console.log(':::: findOne UsersService');
    return await this.prisma.user.findUnique({
      // model with a @@unique block
      // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique
      where: {
        identifiers: {
          username: username,
          password: password,
        },

        // Used with findFirst(): OR
        // Keep in mind for username OR email + password
        // OR: [{ id }, { username, password }],
      },
    });
  }

  async findById(id: string) {
    console.log(':::: findOne UsersService');
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
