import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task.model.js";

export class SearchTaskDTO{
    @IsEnum(TaskStatus)
    status?: string;

    @IsNotEmpty()
    search?: string;
}