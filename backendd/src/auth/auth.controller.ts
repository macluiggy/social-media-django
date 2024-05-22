import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req /**, UseGuards */,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/users.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import ApiStandardResponse from '../common/interceptors/api-response';
import getApiEndpoint from '../common/utils/getApiEndpoint';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller(getApiEndpoint('auth'))
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req: Request & { user: any }) {
    const body = req.body;
    const user = {
      email: body.email,
      password: body.password,
    };
    const data = await this.authService.signIn(user);
    return new ApiStandardResponse(data);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('profileImage'))
  async signUp(
    @Body() user: UserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
            message(maxSize) {
              return `File too large. Max size is ${maxSize}`;
            },
          }),
          new FileTypeValidator({
            // regex that starts with image and ends with png, jpg, or jpeg
            fileType: /^image\/(png|jpg|jpeg)$/,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    profileImage: Express.Multer.File,
  ) {
    user.profileImage = profileImage;
    const data = await this.authService.singUp(user);
    return new ApiStandardResponse(data, 'User created successfully');
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
