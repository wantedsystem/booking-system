export const errors = {
    server: "Something went wrong, please try again later",
    noNetwork: "Connection error, please try again later",
    validation: {
        required: "This field is required",
        email: {
            invalid: "Invalid email address"
        },
        password: {
            confirm: "Passwords do not match"
        }
    },
    transaction: {
        noId: "Transaction failed, please try again later",
        notConnected: "Wallet not connected"
    },
    metaMask: {
        alreadyPending: "Pease check the extension",
        rejected: "Connection rejected",
        default: "MetaMask Error"
    }
};
