/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';
import { useRef } from 'react';
import CurrentStudentContext from '../contexts/CurrentStudent';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const currentStudent = useRef(null);

  const setCurrentStudent = (std) => {
    currentStudent.current = std;
  };

  return (
    <ApolloProvider client={client}>
      <CurrentStudentContext.Provider value={{ currentStudent, setCurrentStudent }}>
        <Component {...pageProps} />
      </CurrentStudentContext.Provider>
    </ApolloProvider>
  );
}
