// API Service - Replace BASE_URL with your Laravel API endpoint
const BASE_URL = '/api'; // Change to your Laravel API URL e.g., 'https://your-laravel-app.com/api'

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
}

// Get stored token
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set token
const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove token
const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Default headers
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Generic fetch wrapper
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Mock response for development - replace with actual API call
    // const response = await apiRequest<AuthResponse>('/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
    
    // Mock login for demo
    if (credentials.email === 'admin@demo.com' && credentials.password === 'password') {
      const mockResponse: AuthResponse = {
        user: {
          id: 1,
          name: 'Richard Hanrick',
          email: 'admin@demo.com',
          avatar: '/avatar.png'
        },
        token: 'mock-jwt-token-12345'
      };
      setToken(mockResponse.token);
      return mockResponse;
    }
    throw new Error('Invalid credentials');
  },

  logout: async (): Promise<void> => {
    // await apiRequest('/logout', { method: 'POST' });
    removeToken();
  },

  getUser: async () => {
    // return apiRequest('/user');
    const token = getToken();
    if (!token) throw new Error('Not authenticated');
    return {
      data: {
        id: 1,
        name: 'Richard Hanrick',
        email: 'admin@demo.com',
      },
      success: true
    };
  },
};

// Profile API
export const profileApi = {
  get: () => apiRequest('/profile'),
  update: (data: FormData) => apiRequest('/profile', {
    method: 'PUT',
    body: data,
    headers: {} // Let browser set content-type for FormData
  }),
};

// Skills API
export const skillsApi = {
  getAll: () => apiRequest('/skills'),
  create: (data: object) => apiRequest('/skills', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: object) => apiRequest(`/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest(`/skills/${id}`, {
    method: 'DELETE',
  }),
};

// Projects API
export const projectsApi = {
  getAll: () => apiRequest('/projects'),
  create: (data: FormData) => apiRequest('/projects', {
    method: 'POST',
    body: data,
    headers: {}
  }),
  update: (id: number, data: FormData) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: data,
    headers: {}
  }),
  delete: (id: number) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Blog API
export const blogApi = {
  getAll: () => apiRequest('/posts'),
  create: (data: FormData) => apiRequest('/posts', {
    method: 'POST',
    body: data,
    headers: {}
  }),
  update: (id: number, data: FormData) => apiRequest(`/posts/${id}`, {
    method: 'PUT',
    body: data,
    headers: {}
  }),
  delete: (id: number) => apiRequest(`/posts/${id}`, {
    method: 'DELETE',
  }),
};

// Contact Messages API
export const contactApi = {
  getAll: () => apiRequest('/contacts'),
  markAsRead: (id: number) => apiRequest(`/contacts/${id}/read`, {
    method: 'PUT',
  }),
  delete: (id: number) => apiRequest(`/contacts/${id}`, {
    method: 'DELETE',
  }),
};

// Notifications API
export const notificationsApi = {
  getAll: () => apiRequest('/notifications'),
  markAsRead: (id: number) => apiRequest(`/notifications/${id}/read`, {
    method: 'PUT',
  }),
  markAllAsRead: () => apiRequest('/notifications/read-all', {
    method: 'PUT',
  }),
};

export { getToken, setToken, removeToken };
