import { useQuery } from '@apollo/client';
import BookTable from '../components/BookTable';
import {
  GET_BOOKS,
} from '../queries';

function AllBook() {
  const {
    data: { getBooks: books } = { getBooks: null },
  } = useQuery(GET_BOOKS, {
    variables: {
      condition: 'LOST',
    },
  });
  return (
    <>
      <br />
      <BookTable data={books} />
    </>
  );
}

export default AllBook;
