import { render, screen, waitFor } from '@testing-library/react';
import { apiService } from '../../apiService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StoreProvider from '../../store';
import MovieDetail from '.';
import '@testing-library/jest-dom'
import { getMovieDetail, getMovieReviews } from './api';

jest.mock('../../apiService');

const mockedApiService = apiService as jest.Mocked<typeof apiService>;

// Mock the getMovieDetail & getMovieReviews function
jest.mock('./api', () => ({
  ...jest.requireActual('./api'), // use actual implementation for non-mocked parts
  getMovieDetail: jest.fn(),
  getMovieReviews: jest.fn(),
}));

test('renders and displays data fetched from API', async () => {
  const mockedDataForMovie = {
    "adult": false,
    "backdrop_path": "/sRLC052ieEzkQs9dEtPMfFxYkej.jpg",
    "id": 848326,
    "title": "Rebel Moon",
    "original_language": "en",
    "original_title": "Rebel Moon - Part One: A Child of Fire",
    "overview": "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch Kora, a young woman with a mysterious past, to seek out warriors from neighboring planets to help them take a stand.",
    "poster_path": "/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
    "media_type": "movie",
    "genre_ids": [878, 28, 12],
    "popularity": 923.889,
    "release_date": "2023-12-15",
    "video": false,
    "vote_average": 6.442,
    "vote_count": 482
  };

  const mockedDataForRevies = {
    results: [
      {
        "author": "Manuel São Bento",
        "author_details": {
          "name": "Manuel São Bento",
          "username": "msbreviews",
          "avatar_path": null,
          "rating": 6.0
        },
        "content": "FULL SPOILER-FREE REVIEW @ https://fandomwire.com/aquaman-and-the-lost-kingdom-review/\r\n\r\n\"Aquaman and the Lost Kingdom is a 'fine' farewell to the DCEU. Jason Momoa and Patrick Wilson's amusing chemistry offers plenty of entertaining moments, as their characters' complex relationship takes center stage as the primary thematic force. Mostly consistent from a visual standpoint, featuring well-executed set pieces that will leave the more action-addicted fans satisfied.\r\n\r\nNevertheless, the overreliance on exposition, a messy narrative structure, and other minor yet questionable decisions detract from the overall cohesiveness of the story. As the final installment, it's a pretty accurate mirror that reflects the highs and lows of the cinematic universe as a whole.\r\n\r\nWhile far from a mind-blowing send-off, it encapsulates the essence of the DCEU - a journey filled with few triumphs, many missed opportunities, and incomprehensible disasters.\"\r\n\r\nRating: B-",
        "created_at": "2023-12-21T16:26:21.038Z",
        "id": "6584672cf1759c3f51118a1e",
        "updated_at": "2023-12-21T16:26:21.147Z",
        "url": "https://www.themoviedb.org/review/6584672cf1759c3f51118a1e"
      }
    ]
  }

  // Set up the mock response for the Axios get request
  mockedApiService.get.mockResolvedValueOnce({ data: mockedDataForMovie });

  // Mock the getMovieDetail function
  (getMovieDetail as jest.Mock).mockImplementation((movieId, setMovie, setLoading, setShowAlert) => {
    // Simulate the behavior of getMovieDetail
    setMovie(mockedDataForMovie);
    setLoading(false);
  });

  // Mock the getMovieDetail function
  (getMovieReviews as jest.Mock).mockImplementation((id, setReviews, setIsReviewLoading, setShowAlert) => {
    // Simulate the behavior of getMovieReviews
    setReviews(mockedDataForRevies.results); // Assuming results is an array in your actual response
    setIsReviewLoading(false);
  });

  render(
    <MemoryRouter initialEntries={['/movie/848326']}>
      <StoreProvider>
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </StoreProvider>
    </MemoryRouter>
  );

  // Wait for the component to render with the fetched data
  await waitFor(() => {
    expect(screen.getByText("Rebel Moon")).toBeInTheDocument();
    expect(screen.getByText("482")).toBeInTheDocument();
  });

  // Ensure that the mocked functions were called
  expect(getMovieDetail).toHaveBeenCalledWith("848326", expect.any(Function), expect.any(Function), expect.any(Function));
  expect(getMovieReviews).toHaveBeenCalledWith('848326', expect.any(Function), expect.any(Function), expect.any(Function));
});