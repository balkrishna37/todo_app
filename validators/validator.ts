import { NextFunction, Request, Response } from "express"

const { body, validationResult } = require('express-validator')
export const taskValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status').notEmpty().isIn(['to-do','upcoming','done']).withMessage(`Must contain one of these values: 'to-do','upcoming','done'`)
  ]
}

export const validate = (req:Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any = []
  errors.array().map((err: { path: any; msg: any }) => {
    extractedErrors.push({ [err.path]: err.msg })
  })

  return res.status(422).json({
    status: "error",
    errors: extractedErrors,
  })
}