import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { PokemonCard } from '../components/ui/PokemonCard';

export const FavoritesPage: React.FC = () => {
  const { user, isAuthenticated, capturedPokemon } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso Restringido</h1>
          <p className="text-gray-600">Necesitas iniciar sesión para ver tus Pokémon capturados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mis Pokémon Capturados
          </h1>
          <p className="text-gray-600">
            ¡Bienvenido, {user?.name}! Aquí están todos los Pokémon que has capturado.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{capturedPokemon.length}</div>
              <div className="text-gray-600">Pokémon Capturados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {capturedPokemon.length > 0 ? Math.round((capturedPokemon.length / 151) * 100) : 0}%
              </div>
              <div className="text-gray-600">Completado (de 151)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {new Set(capturedPokemon.flatMap(p => p.types)).size}
              </div>
              <div className="text-gray-600">Tipos Diferentes</div>
            </div>
          </div>
        </div>

        {/* Pokemon Grid */}
        {capturedPokemon.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-8xl mb-4">🎣</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡No has capturado ningún Pokémon aún!</h2>
            <p className="text-gray-600 mb-6">
              Ve a la página principal y comienza tu aventura Pokémon.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Ir a la Pokédex
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {capturedPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 