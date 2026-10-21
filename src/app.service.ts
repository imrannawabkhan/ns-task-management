import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {}

    getDbPassword() {
        return this.configService.get<string>('DB_PASSWORD');
    }
    getDbUsername() {
        return this.configService.get<string>('DB_USERNAME');
    }
    getDbHost() {
        return this.configService.get<string>('DB_HOST');
    }
    getDbName() {
        return this.configService.get('DB_DATABASE');
    }
    getDbPort() {
        return this.configService.get<number>('DB_PORT');
    }
    getAppPort() {
        return this.configService.get<number>('APP_PORT');  
    }
}