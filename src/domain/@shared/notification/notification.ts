export type NotificationErrorProps = {
    message: string;
    context?: string;
};

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this._errors.push(error);
    }

    messages(context?: string): string {
        if (!this._errors.some((error) => error.context)) {
            return this._errors
                .map((error) => `${error.context}: ${error.message}`)
                .join(", ");
        }

        return this._errors
            .filter((error) => !context || error.context === context)
            .map((error) => `${error.context}: ${error.message}`)
            .join(", ");
    }

    hasErrors(): boolean {
        return !!this._errors?.length
    }

    get errors() {
        return this._errors;
    }
}