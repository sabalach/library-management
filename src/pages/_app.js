/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.dark.css'; // or 'antd/dist/antd.less'
import '../css/main.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';
import { useEffect, useRef, useState } from 'react';
import NextNprogress from 'nextjs-progressbar';
import createUploadLink from 'apollo-upload-client/public/createUploadLink';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { setContext } from '@apollo/client/link/context';
import CurrentStudentContext from '../contexts/CurrentStudent';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof localStorage === 'undefined') {
    return {
      headers: {
        ...headers,
      },
    };
  }
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      headers: {
        ...headers,
      },
    };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  link: authLink.concat(createUploadLink()),
  cache: new InMemoryCache(),
});

const SiteLayout = dynamic(
  () => import('../components/SiteLayout'),
  {
    loading: () => (
      <div className="loader-bg">
        <div className="loader-p" />
      </div>
    ),
    ssr: false,
  },
);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const currentStudent = useRef(null);

  const setCurrentStudent = (std) => {
    currentStudent.current = std;
  };

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login').then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <CurrentStudentContext.Provider value={{ currentStudent, setCurrentStudent }}>
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
        />
        {!loading && (
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
        )}
      </CurrentStudentContext.Provider>
    </ApolloProvider>
  );
}
