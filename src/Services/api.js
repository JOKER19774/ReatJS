const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_FAKESTORE_API_KEY ||
  'https://fakestoreapi.com';

const NORMALIZED_BASE_URL = BASE_URL.replace(/\/$/, '');

const api = {
  async get(path) {
    const response = await fetch(`${NORMALIZED_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return { data };
  },
};

export default api;
