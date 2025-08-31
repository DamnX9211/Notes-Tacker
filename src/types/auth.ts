export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}