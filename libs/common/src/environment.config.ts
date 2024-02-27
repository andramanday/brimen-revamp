import { ConfigModule } from '@nestjs/config';
import { configEnvValidation } from './joi.config';

export const ConfigEnvironment = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.env.stage.${process.env.STAGE}`],
  validationSchema: configEnvValidation,
});
