import z from 'zod';
import { AdminError } from "../utils/errors/admin.error.js"
import AppError from "../utils/AppError.js";


export const validate = (schema) => (req, res, next) => {
  try {

      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      next();
    } catch (error) {
      //console.log('Erreur de validation:', error);
      
      if (error instanceof z.ZodError) {
        
        const details = error.issues.map(e => ({
          path: e.path.join("."),
          message: e.message,
        }));

        return next(new AppError(AdminError.VALIDATION_ERROR, details));
      }

      next(error);
    }
};