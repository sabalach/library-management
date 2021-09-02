/* eslint-disable react/jsx-props-no-spreading */
// import 'antd/dist/antd.css';
import '../css/main.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';
import { useEffect, useRef, useState } from 'react';
import NextNprogress from 'nextjs-progressbar';
import createUploadLink from 'apollo-upload-client/public/createUploadLink';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { setContext } from '@apollo/client/link/context';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import Head from 'next/head';
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

const themes = {
  light: 'antd/antd.css',
  dark: 'antd/antd.dark.css',
};

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
    if (!token && router.route !== '/login') {
      router.push({
        pathname: '/login',
        query: {
          ...(router.route !== '/' ? { fwd: router.route } : {}),
        },
      }).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
      <ApolloProvider client={client}>
        <CurrentStudentContext.Provider value={{ currentStudent, setCurrentStudent }}>
          <NextNprogress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height="3"
          />
          <Head>
            <title>Library Management System</title>
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          {!loading && (
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
          )}
        </CurrentStudentContext.Provider>
      </ApolloProvider>
    </ThemeSwitcherProvider>
  );
}
