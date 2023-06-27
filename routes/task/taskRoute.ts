import { taskController } from "../../controller/Task/taskController";
import { taskValidationRules, validate } from "../../validators/validator";


module.exports = (router: any) => {
    router.post("/task/create", taskValidationRules(),validate, taskController.createTask);
    router.put("/task/:id",taskValidationRules(),validate, taskController.updateTask);
    router.get("/task/:id", taskController.getTask);
    router.get("/task", taskController.getAllTasks);
    router.delete("/task/:id", taskController.deleteTask);
};
