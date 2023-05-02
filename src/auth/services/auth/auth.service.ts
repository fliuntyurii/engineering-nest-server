import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserType, SignInUserType } from 'src/utils/types';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(userData: CreateUserType) {
    const { email, password, confirmPassword, keyWord } = userData;

    if(keyWord !== process.env.KEY_WORD) {
      throw new Error('YOU HAVE NOT ACCESS');
    }

    if(password !== confirmPassword) {
      return null;
    }

    const userExists = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if(userExists) {
      return null;
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword
    });

    return this.userRepository.save(newUser);
  }

  async signIn(userData: SignInUserType) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email }
    });

    const isMatch = await compare(userData.password, user.password);
    if(!isMatch) {
      return null;
    }

    return user;
  }
}