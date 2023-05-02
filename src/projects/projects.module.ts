import { Module } from '@nestjs/common';
import { ProjectService } from './services/project/project.service';
import { ProjectController } from './controllers/project/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/Project';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectsModule {}
