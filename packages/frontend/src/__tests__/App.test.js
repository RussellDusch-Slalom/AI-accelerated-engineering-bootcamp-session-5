import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should delete todo when delete button is clicked', async () => {
  const user = userEvent.setup();
  const testQueryClient = createTestQueryClient();

  // Mock initial fetch to return a todo
  const mockTodos = [
    { id: 1, title: 'Test Todo', completed: false },
  ];

  global.fetch.mockImplementation((url, options) => {
    // Initial GET request
    if (!options || options.method === 'GET') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      });
    }
    // DELETE request
    if (options.method === 'DELETE') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos[0]),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for the todo to appear
  expect(await screen.findByText('Test Todo')).toBeInTheDocument();

  // Find and click the delete button using accessible label
  const deleteButton = screen.getByRole('button', { name: /delete todo/i });

  await user.click(deleteButton);

  // Verify DELETE fetch was called
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('should display correct stats for incomplete and completed todos', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock todos with mixed completion status
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: false },
    { id: 3, title: 'Todo 3', completed: true },
  ];

  global.fetch.mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Todo 1');

  // Verify stats show correct counts
  expect(await screen.findByText('2 items left')).toBeInTheDocument();
  expect(await screen.findByText('1 completed')).toBeInTheDocument();
});

test('should display empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock empty todos array
  global.fetch.mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for component to load and verify empty state message is shown
  expect(await screen.findByText(/no todos yet/i)).toBeInTheDocument();
});

test('should display error message when API fails', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock fetch to reject (simulate network error)
  global.fetch.mockImplementation(() => {
    return Promise.reject(new Error('Network error'));
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for and verify error message is displayed
  expect(await screen.findByText(/error loading todos/i)).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
