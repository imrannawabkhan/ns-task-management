import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task.model.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTasksFilterDto } from './dto/get-task.dto.js';
import { TasksRepository } from './task.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity.js';
import { User } from '../auth/user.entity.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }

  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status, user);
  }

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;

  //     let tasks = this.getAllTasks();

  //     if(status) {
  //         tasks = tasks.filter((task) => task.status === status);
  //     }

  //     if(search) {
  //         tasks = tasks.filter((task) => {
  //             if(task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) {
  //                 return true;
  //             }
  //             return false;
  //         });
  //     }

  //     return tasks;
  // }

  // getTaskById(id: string): Task {
  //     const found = this.tasks.find((task) => task.id === id);

  //     if (!found) {
  //         throw new NotFoundException(`Task with ID "${id}" not found`);
  //     }

  //     return found;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;

  //     const task: Task = {
  //         id: UUID(),
  //         title,
  //         description,
  //         status: TaskStatus.OPEN
  //     };
  //     this.tasks.push(task);
  //     return task;
  // }

  // deleteTask(id: string) : void {
  //     const found = this.getTaskById(id);
  //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const found = this.getTaskById(id);
  //     found.status = status;
  //     return found;
  // }
}
