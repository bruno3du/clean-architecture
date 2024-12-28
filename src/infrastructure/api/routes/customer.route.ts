import { Response, Router } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import { InputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";
import { ListCustomerUsecase } from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/customer.repository";
import { RequestBody } from "../@types/request-body.type";

export const customerRoute = Router();

customerRoute.get("/", async (req: RequestBody<InputListCustomerDto>, res: Response) => {
    const usecase = new ListCustomerUsecase(new CustomerRepository());
    try {
        const output = await usecase.execute();
        res.status(200).json(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.post("/", async (req: RequestBody<InputCreateCustomerDto>, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = new InputCreateCustomerDto(req.body.name, req.body.address);
        const output = await usecase.execute(customerDto);
        res.status(201).json(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
