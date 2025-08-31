const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }
    return response.json();
  }

  // Auth methods
  async signup(name: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await this.handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    const data = await this.handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Notes methods
  async getNotes() {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createNote(title: string, content: string) {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ title, content }),
    });
    return this.handleResponse(response);
  }

  async deleteNote(id: string) {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Utility methods
  logout() {
    localStorage.removeItem('authToken');
  }

  getToken() {
    return localStorage.getItem('authToken');
  }
}

export const apiClient = new ApiClient();