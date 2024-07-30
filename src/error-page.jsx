// src/error-page.jsx

import React from 'react';
import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

const ErrorImage = styled.img`
  width: 200px;
  height: 200px;
`;

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <ErrorPageContainer id="error-page">
      <h1>Oops!</h1>
      <ErrorImage src="./src/assets/dw_logo.png" alt="error" />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </ErrorPageContainer>
  );
}