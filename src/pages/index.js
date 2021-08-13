import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Main() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }, []);
  return (
    <div />
  );
}

export default Main;
