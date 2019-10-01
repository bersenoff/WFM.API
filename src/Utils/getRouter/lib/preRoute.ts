import { Response, Request, NextFunction } from "../../../@types/answer";

const preRoute = (req: Request, res: Response, next: NextFunction) => {
  res.answer = {};
  // res = Object.assign(res, { answer: {}, reqTime: Date.now() });
  // // res = {
  // //   ...res,
  // //   answer: {},
  // //   reqTime: Date.now()
  // // }
  res.reqTime = Date.now();
  next();
};

export default preRoute;
