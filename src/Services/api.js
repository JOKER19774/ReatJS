const BASE_URL = import.meta.env.VITE_FAKESTORE_API_KEY || 'https://fakestoreapi.com';

const api = {
  async get(path) {
    const response = await fetch(`${BASE_URL}${path}`, {
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
