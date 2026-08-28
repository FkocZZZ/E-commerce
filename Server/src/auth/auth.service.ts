import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password} = registerDto;
    const existingUser = await this.userRepository.findOneBy({ email: email });

    if(existingUser) {
      throw new ConflictException('Email already existed!');
    }
    
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = this.userRepository.create({ ...registerDto, password: hashedPassword });

    return await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ message: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: { password: true }
    })

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    return { message: 'Login Successful!'}
  }
}
