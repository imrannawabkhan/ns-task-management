import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity.js';
import { TasksRepository } from './task.repository.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task
    ]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksRepository,
],
})
export class TasksModule {}
