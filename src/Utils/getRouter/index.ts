import { Router } from "express";
import { Response, Request, NextFunction } from "../../@types/answer";
import { checkParams, preRoute } from "./lib";

/**
 * Генерация роута
 */
export default (path: string, fn: (body: any) => Promise<any>, params?: string[]) => {
  const router = Router();

  const middleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(params, req.body);

      const data = await fn(req.body);
      res.answer.data = typeof data === "undefined" ? [] : data;

      next();
    } catch (err) {
      res.answer.error = {
        message: err.message,
        stack: process.env.ENVIRONMENT === "development" ? err.stack : undefined,
      };

      next();
    }
  };

  const postRoute = (req: Request, res: Response) => {
    const time: number = Date.now() - res.reqTime;

    res.answer.meta = { time };

    if (res.answer.error) return res.status(400).json(res.answer);
    return res.status(200).json(res.answer);
  };

  router.post(path, preRoute, middleRoute, postRoute);

  return router;
};
