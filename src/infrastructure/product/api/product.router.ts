import { Response, Router } from "express";
import { InputCreateProductDto } from "../../../usecase/products/create/create.product.dto";
import { CreateProductUseCase } from "../../../usecase/products/create/create.product.usecase";
import { InputFindProductDto } from "../../../usecase/products/find/find.product.dto";
import { FindProductUseCase } from "../../../usecase/products/find/find.product.usecase";
import { InputListProductDto } from "../../../usecase/products/list/list.product.dto";
import { ListProductUsecase } from "../../../usecase/products/list/list.product.usecase";
import { InputUpdateProductDto } from "../../../usecase/products/update/update.product.dto";
import UpdateProductUseCase from "../../../usecase/products/update/update.product.usecase";
import { RequestBody } from "../../api/@types/request-body.type";
import ProductRepository from "../repository/product.repository";

export const productRoute = Router();

const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const findProductUseCase = new FindProductUseCase(productRepository);
const listProductUseCase = new ListProductUsecase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);

productRoute.post("/", async (req: RequestBody<InputCreateProductDto>, res: Response) => {
    try {
        const product = await createProductUseCase.execute(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/:id", async (req: RequestBody<{}, InputFindProductDto>, res: Response) => {
    try {
        const product = await findProductUseCase.execute({
            id: req.params.id,
        });

        res.status(200).json(product);
    } catch (err) {
        res.status(404).send(err);
    }
});

productRoute.get("/", async (req: RequestBody<InputListProductDto>, res: Response) => {
    try {
        const products = await listProductUseCase.execute(req.body);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.put("/:id", async (req: RequestBody<Omit<InputUpdateProductDto, "id">, {
    id: string;
}>, res: Response) => {
    try {
        const product = await updateProductUseCase.execute({
            id: req.params.id,
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(404).send(err);
    }
});


