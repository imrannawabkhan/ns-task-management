import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity.js";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentails.dto.js";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private datasource: DataSource) {
        super(User, datasource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ 
            username,
            password: hashedPassword
        });

        try {
            await this.save(user);
        } catch (error:any) {
            // Unique violation error code for PostgreSQL
            if (error.code === '23505') { 
                throw new ConflictException('Username already exists');
            } else {
                // Handle other errors or rethrow
                throw new InternalServerErrorException();
            }
        }
    }
}