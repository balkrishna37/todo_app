import { Request, Response } from "express";
import { TaskService } from "../../services/taskService";

export class taskController {
    public static async createTask(req: Request, res: Response) {
        try {
            const reqBody = req.body;
            const taskService = new TaskService();
            const createBody = {
                name: reqBody.name,
                description: reqBody.description,
                status: reqBody.status,
            };
            const createTask = await taskService.create(createBody);
            return res.send({
                status: "success",
                message: "Task created Successfully",
                data: createTask,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async updateTask(req: Request, res: Response) {
        try {
            const taskId: any = req.params.id;
            const reqBody = req.body;
            const taskService = new TaskService();
            const taskExists = await taskService.getTaskById(taskId);
            if (!taskExists) {
                return res.status(404).send({
                    status: "error",
                    error: ["Task Not Found"],
                });
            }
            const updateBody = {
                name: reqBody.name,
                description: reqBody.description,
                position: reqBody.position,
                status: reqBody.status,
            };
            const updateTask = await taskService.updateTask(
                taskExists[0],
                updateBody
            );
            return res.send({
                status: "success",
                message: "Task updated Successfully",
                data: updateTask,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async getAllTasks(req: Request, res: Response) {
        try {
            const query = req.query;
            const taskService = new TaskService();
            let filterQuery: any = {};
            if (query.status) {
                filterQuery.status = query.status;
            }
            const tasks = await taskService.getAllTasks(filterQuery);
            return res.send({
                status: "success",
                data: tasks,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async getTask(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
            const taskService = new TaskService();
            const task = await taskService.getTaskById(taskId);
            if (task.length==0) {
                return res.status(401).send({
                    status: "error",
                    error: ["Task Not Found"],
                });
            }
            return res.send({
                status: "success",
                data: task,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }

    public static async deleteTask(req: Request, res: Response) {
        try {
            const taskId: any = req.params.id;
            const taskService = new TaskService();
            const task = await taskService.getTaskById(taskId);
            if (task.length==0) {
                return res.status(401).send({
                    status: "error",
                    error: ["Task Not Found"],
                });
            }

            await taskService.delete(taskId);
            return res.send({
                status: "success",
                message: "Task deleted successfully"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                error: ["Internal Server"],
            });
        }
    }
}
