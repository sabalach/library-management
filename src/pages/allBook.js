import { useQuery } from '@apollo/client';
import BookTable from '../components/BookTable';
import {
  GET_BOOKS,
} from '../queries';

function AllBook() {
  const {
    data: { getBooks: books } = { getBooks: [] },
  } = useQuery(GET_BOOKS);
  return (
    <>
      <br />
      <BookTable data={books} />
    </>
  );
}

export default AllBook;
