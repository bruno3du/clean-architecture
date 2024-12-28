import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { customerRoute } from '../customer/api/customer.route';
import CustomerModel from '../customer/sequelize/model/customer.model';
import { productRoute } from '../product/api/product.router';
import ProductModel from '../product/sequelize/model/product.model';

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;


async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });

    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
}

setupDb();