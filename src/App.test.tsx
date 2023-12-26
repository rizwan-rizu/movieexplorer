import { render, screen } from '@testing-library/react';
import App from './App';
import StoreProvider from './store';

test('renders react app correctly on default route', () => {
  render(<StoreProvider><App /></StoreProvider>);
  const linkElement1 = screen.getByText("The");
  const linkElement2 = screen.getByText("Movie");
  const linkElement3 = screen.getByText("Tracker");
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});
