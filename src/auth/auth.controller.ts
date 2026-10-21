import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthCredentialsDto } from './dto/auth-credentails.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //console.log('AuthController.signUp called with:', authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    //console.log('AuthController.signIn called with:', authCredentialsDto);
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/authorized')
  @UseGuards(AuthGuard())
  test(@Request() req: any): void {
    console.log('AuthController.test called with:', req.user);
  }
}
