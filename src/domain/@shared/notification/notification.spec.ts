import Notification from "./notification";

describe("Unit test: Notification", () => {
    it("should create errors", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.messages("customer")).toBe("customer: Error message");


        const error2 = {
            message: "Error message 2",
            context: "customer",
        }

        notification.addError(error2);

        expect(notification.messages("customer")).toBe("customer: Error message, customer: Error message 2");

        const error3 = {
            message: "Error message 3",
            context: "product",
        }

        notification.addError(error3);

        expect(notification.messages("customer")).toBe("customer: Error message, customer: Error message 2");
        expect(notification.messages("product")).toBe("product: Error message 3");
    });

    it("should show every message when context is not defined", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",
        }

        const error2 = {
            message: "Error message 2",
            context: "customer",
        }

        const error3 = {
            message: "Error message 3",
            context: "product",
        }

        notification.addError(error);
        notification.addError(error2);
        notification.addError(error3);

        expect(notification.messages()).toBe("customer: Error message, customer: Error message 2, product: Error message 3");

    });

    it("should check if notification has at least one error", () => {
        const notification = new Notification();
        expect(notification.hasErrors()).toBe(false);

        const error = {
            message: "Error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    })

    it("should get all errors", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.errors).toEqual([error]);
    })
});