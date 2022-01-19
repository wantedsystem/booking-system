import Button from "components/ui/Button";
import Link from "next/link";
import { useAppSelector } from "redux/store";
import { PaginationWrapper } from "./style";

const RoomPagination: React.FunctionComponent = () => {
    const { meta, links } = useAppSelector(state => state.rooms);
    return (
        <PaginationWrapper>
            {links.previous && (
                <Link href={`rooms?page=${meta.currentPage - 1}`} passHref>
                    <Button as="a" secondary>
                        Previous{" "}
                    </Button>
                </Link>
            )}
            {[...Array(meta.totalPages)].map((_, i) => (
                <Link key={i} href={"rooms?page=" + (i + 1)} passHref>
                    <Button active={meta.currentPage == i + 1} as="a" secondary>
                        {i + 1}
                    </Button>
                </Link>
            ))}
            {links.next && (
                <Link href={`rooms?page=${meta.currentPage + 1}`} passHref>
                    <Button as="a" secondary>
                        Next{" "}
                    </Button>
                </Link>
            )}
        </PaginationWrapper>
    );
};

export default RoomPagination;
