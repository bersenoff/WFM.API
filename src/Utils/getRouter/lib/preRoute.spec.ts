import { Response, Request, NextFunction } from "../../../@types/answer";
import preRoute from "./preRoute";

const mockRequest = () => {
  let req: any = {};
  return req;
};

const mockResponse = () => {
  let res: any = {};
  return res;
};

const mockNext = (err?: any): NextFunction => jest.fn().mockReturnValue(err);

describe("Первый оброботчик роутов", () => {
  it("Отработал без ошибок", () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    preRoute(req, res, next);

    expect(res.answer).toEqual({});
  });
});
