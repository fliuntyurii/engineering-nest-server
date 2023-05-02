import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from './typeorm/entities/User';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'nest_js_sql',
  entities: [User],
  synchronize: true,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(config as any),
    AuthModule,
    ProjectsModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRES },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
