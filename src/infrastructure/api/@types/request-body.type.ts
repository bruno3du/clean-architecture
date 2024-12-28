import { Request } from "express";

export type RequestBody<TReqBody, TReqParams = {}> = Request<TReqParams, {}, TReqBody>
