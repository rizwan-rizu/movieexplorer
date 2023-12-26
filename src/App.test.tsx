import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import StoreProvider from './store';
import '@testing-library/jest-dom'
import ProtectedRoute from './protectedRoutes';
import MovieDetail from './Pages/movieDetail';
import { roles } from './utility';

test('renders react app correctly on default route', async () => {
  render(<StoreProvider><App /></StoreProvider>, { wrapper: BrowserRouter });
  expect(screen.getByText("The")).toBeInTheDocument();
  expect(screen.getByText("Movie")).toBeInTheDocument();
  expect(screen.getByText("Tracker")).toBeInTheDocument();
  expect(true).toBeTruthy();
});

test('renders Registration component when on the register route', () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );

  const linkElement1 = screen.getByText("The");
  const linkElement2 = screen.getByText("Movie");
  const linkElement3 = screen.getByText("Tracker");
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
  expect(screen.getByTestId('user-input')).toBeInTheDocument()
  expect(screen.getByTestId('email-input')).toBeInTheDocument()
  expect(screen.getByTestId('password-input')).toBeInTheDocument()
  expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument()
  expect(screen.getByTestId('signup-button')).toBeInTheDocument()
});

test('renders login component when on the login route', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("The")).toBeInTheDocument();
  expect(screen.getByText("Movie")).toBeInTheDocument();
  expect(screen.getByText("Tracker")).toBeInTheDocument();
  expect(screen.getByTestId('user-input')).toBeInTheDocument()
  expect(screen.getByTestId('password-input')).toBeInTheDocument()
  expect(screen.getByTestId('login-button')).toBeInTheDocument()
});

test('renders serach component when on the search route', () => {
  render(
    <MemoryRouter initialEntries={['/search']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("Showing searched results for:")).toBeInTheDocument()
  expect(screen.getByTestId('search-input')).toBeInTheDocument()
  expect(screen.getByTestId('filterby-movie-button')).toBeInTheDocument()
  expect(screen.getByTestId('filterby-tv-button')).toBeInTheDocument()
});

test('renders movie detail component when on the movie detail route', async () => {
  render(
    <MemoryRouter initialEntries={['/movie/123']}>
      <StoreProvider>
        <Routes>
          <Route path="/movie/:movieId" element={<ProtectedRoute role={[roles.ALL]} element={<MovieDetail />} />} />
        </Routes>
      </StoreProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("The")).toBeInTheDocument();
  expect(screen.getByText("Movie")).toBeInTheDocument();
  expect(screen.getByText("Tracker")).toBeInTheDocument();
  expect(true).toBeTruthy();
});