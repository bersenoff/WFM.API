import { Response as ExpressResponse, Request, NextFunction } from "express";

export interface Response extends ExpressResponse {
  answer: {
    data?: any;
    error?: any;
    meta?: any;
  };
  reqTime: number;
}

export { Request, NextFunction };
