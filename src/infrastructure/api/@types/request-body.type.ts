import { Request } from "express";

export type RequestBody<T> = Request<{}, {}, T>
