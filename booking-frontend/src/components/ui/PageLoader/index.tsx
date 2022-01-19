import { LoaderWrapper, Loader } from "./style";

const PageLoader: React.FunctionComponent = () => {
    return (
        <LoaderWrapper>
            <Loader />
        </LoaderWrapper>
    );
};

export default PageLoader;
