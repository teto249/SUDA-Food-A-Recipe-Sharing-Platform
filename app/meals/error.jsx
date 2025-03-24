'use client';

import { useEffect, useState } from 'react';

export default function Error({ error }) {
  const [errorMessage, setErrorMessage] = useState("An unknown error occurred.");

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
    }
  }, [error]);

  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>{errorMessage}</p>
    </main>
  );
}
