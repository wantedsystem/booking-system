import { errors } from "lang/errors";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
    const isMetaMaskError = error.code;
    if (isMetaMaskError) {
        return formateMetaMaskError(error);
    }
    let formattedErr: string;
    const isNetworkError =
        error.isAxiosError && error.toJSON().message === "Network Error";
    switch (true) {
        case isNetworkError:
            formattedErr = errors.noNetwork;
            break;
        case error.isAxiosError && !isNetworkError:
            formattedErr = Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message;
            break;
        default:
            formattedErr = error.message;
            break;
    }

    return formattedErr.charAt(0).toUpperCase() + formattedErr.slice(1);
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formateMetaMaskError = (error: any) => {
    switch (error.code) {
        case -32002:
            return errors.metaMask.alreadyPending;
        case 4001:
            return errors.metaMask.rejected;
        default:
            return error.message;
    }
};
