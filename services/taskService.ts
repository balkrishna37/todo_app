import { AppDataSource } from "../config/db";
import { Task } from "../entity/task.entity";

export class TaskService {
    async create(taskData: any): Promise<Task> {
        const taskRepository = AppDataSource.manager.getRepository(Task);
        return taskRepository.save(taskData);
    }

    async updateTask(oldTaskData: Task, updatedTaskData: any): Promise<Task> {
        const updatedTask = await this.update(
            {
                id: oldTaskData.id,
            },
            updatedTaskData
        );
        return updatedTask;
    }

    async update(filterQuery: any, taskData: any): Promise<Task> {
        await AppDataSource.manager.update(Task, filterQuery, taskData);
        const updatedData: any = await this.getTask(filterQuery);
        return updatedData;
    }

    async getTaskById(taskId: any) {
        return this.getTask({
            id: taskId,
        });
    }

    async getTask(filterQuery: any) {
        return await AppDataSource.manager.findBy(Task, filterQuery);
    }

    async getAllTasks(filterQuery: any): Promise<Task[]> {
        const tasks = await AppDataSource.manager.find(Task, {
            where: filterQuery,
        });
        return tasks;
    }

    async delete(taskId: number): Promise<any> {
        return AppDataSource.manager.delete(Task, {
            id: taskId,
        });
    }
}
