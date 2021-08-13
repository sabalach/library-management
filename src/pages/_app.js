/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.dark.css'; // or 'antd/dist/antd.less'
import '../css/main.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';
import { useRef } from 'react';
import NextNprogress from 'nextjs-progressbar';
import createUploadLink from 'apollo-upload-client/public/createUploadLink';
import CurrentStudentContext from '../contexts/CurrentStudent';
import SiteLayout from '../components/SiteLayout';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  link: createUploadLink(),
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
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
        />
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </CurrentStudentContext.Provider>
    </ApolloProvider>
  );
}
