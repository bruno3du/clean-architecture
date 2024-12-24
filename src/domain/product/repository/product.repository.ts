import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import Product from "../entity/product-b.entity";
import { ProductInterface } from "../entity/product.interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
