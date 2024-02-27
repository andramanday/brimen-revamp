import { IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
