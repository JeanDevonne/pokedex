import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface AuthState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Pokemon state
  capturedPokemon: Pokemon[];
  
  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  
  // Pokemon actions
  capturePokemon: (pokemon: Pokemon) => void;
  releasePokemon: (pokemonId: number) => void;
  isPokemonCaptured: (pokemonId: number) => boolean;
}

// Usuarios predefinidos para la simulación
const FAKE_USERS = [
  {
    id: '1',
    email: 'ash@pokemon.com',
    password: 'pokemon123',
    name: 'Ash Ketchum'
  },
  {
    id: '2',
    email: 'misty@pokemon.com',
    password: 'pokemon123',
    name: 'Misty'
  },
  {
    id: '3',
    email: 'brock@pokemon.com',
    password: 'pokemon123',
    name: 'Brock'
  },
  {
    id: '4',
    email: 'pikachu@pokemon.com',
    password: 'pokemon123',
    name: 'Pikachu'
  },
  {
    id: '5',
    email: 'professor@pokemon.com',
    password: 'pokemon123',
    name: 'Professor Oak'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      capturedPokemon: [],

      // Auth actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = FAKE_USERS.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name
          };
          
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false
          });
          
          return { success: true, message: 'Login exitoso' };
        } else {
          set({ isLoading: false });
          return { success: false, message: 'Email o contraseña incorrectos' };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          capturedPokemon: [] // Limpiar Pokémon capturados al hacer logout
        });
      },

      // Pokemon actions
      capturePokemon: (pokemon: Pokemon) => {
        const { capturedPokemon } = get();
        const isAlreadyCaptured = capturedPokemon.some(p => p.id === pokemon.id);
        
        if (!isAlreadyCaptured) {
          set({
            capturedPokemon: [...capturedPokemon, pokemon]
          });
        }
      },

      releasePokemon: (pokemonId: number) => {
        const { capturedPokemon } = get();
        set({
          capturedPokemon: capturedPokemon.filter(p => p.id !== pokemonId)
        });
      },

      isPokemonCaptured: (pokemonId: number) => {
        const { capturedPokemon } = get();
        return capturedPokemon.some(p => p.id === pokemonId);
      }
    }),
    {
      name: 'pokemon-auth-storage', // nombre en localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        capturedPokemon: state.capturedPokemon
      })
    }
  )
); 