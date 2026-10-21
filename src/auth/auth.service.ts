import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Implement sign-in logic here, e.g., validate user credentials and generate JWT token
            // For now, just return a dummy access token
            const payload: JwtPayload = { username };
            const accessToken: string = this.jwtService.sign(payload);
            return { accessToken: accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
