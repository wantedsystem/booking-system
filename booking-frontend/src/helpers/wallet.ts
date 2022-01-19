export const getMetaMask = () => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;
    if (!ethereum) {
        throw new Error("MetaMask is not installed");
    }

    return ethereum;
};
