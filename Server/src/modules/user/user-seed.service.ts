import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole } from "./entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedAdmin();
  }

  // Seed default administrator account if it does not exist
  private async seedAdmin() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'admin@gmail.com'
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'DefaultPassword123'

    const adminExists = await this.userRepository.findOne({ where: { email: adminEmail } }) 
    
    if (adminExists) {
      console.log('Admin account already exists. Skipping seed');
      return;
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRound)

    const adminUser = this.userRepository.create({
      email: adminEmail,
      password: hashedPassword,
      username: 'Admin',
      role: UserRole.ADMIN,
    });

    await this.userRepository.save(adminUser)
    console.log('Seeded default Admin account successfully!');
  }
}