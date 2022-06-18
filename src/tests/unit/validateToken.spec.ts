import { validateToken } from "../../middlewares";
import { config } from "dotenv";
import { ErrorHandler } from "../../errors/errors";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

config();

describe("validate token Middlewares Tests", () => {
  const mockReq: Partial<Request> = {};
  const _: Partial<Response> = {};
  const nextFunc: NextFunction = jest.fn();

  it("Error: Missing authorization Token. | status code: 400", () => {
    mockReq.headers = {};

    try {
      validateToken(mockReq as Request, _ as Response, nextFunc);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe("Missing authorization token.");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Error: Jwt Malformed. | status code: 401", () => {
    mockReq.headers = {
      authorization: "Token dsaljdwiojdlksajd",
    };

    try {
      validateToken(mockReq as Request, _ as Response, nextFunc);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe("Jwt Malformed.");
      expect(error.statusCode).toBe(401);
    }
  });

  it("Will call next function and add 'decoded' key on mockReq object.", () => {
    const emailTest = "emailtest@mail.com";
    const token = sign({ emailTest }, process.env.SECRET_KEY);

    mockReq.headers = {
      authorization: `token ${token}`,
    };

    validateToken(mockReq as Request, _ as Response, nextFunc);

    expect(nextFunc).toBeCalled();
    expect(nextFunc).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty("decoded");
    expect(mockReq.decoded.email).toStrictEqual(emailTest);
  });
});
