import { TaskStatus } from "../task.model.js";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
        @IsOptional()
        @IsEnum(TaskStatus)
        status?: string;
    
        @IsOptional()
        @IsString()
        search?: string;
}