import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders main application heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Task Management App/i });
  expect(headingElement).toBeInTheDocument();
});