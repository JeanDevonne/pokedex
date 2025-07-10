import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PokemonCard } from '../components/ui/PokemonCard';
import { getPokemonList, getAllPokemonBasic } from '../services/pokemonApi';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 20;
  const offset = currentPage * limit;

  // Query para paginación normal (siempre activo)
  const { data: paginatedPokemon, isLoading: isLoadingPaginated, error: errorPaginated } = useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
  
  // Query para búsqueda básica (solo nombres, 1 sola llamada)
  const { data: allPokemonBasic, isLoading: isLoadingBasic, error: errorBasic, refetch: refetchBasic } = useQuery({
    queryKey: ['all-pokemon-basic'],
    queryFn: getAllPokemonBasic,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: false, // No se ejecuta automáticamente
  });

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Determinar qué datos usar basado en si hay búsqueda o no
  const isSearching = debouncedSearchTerm.trim().length > 0;
  const error = isSearching ? errorBasic : errorPaginated;

  // Filtrar Pokémon basado en la búsqueda
  const filteredPokemon = useMemo(() => {
    if (isSearching && allPokemonBasic) {
      // Filtrar por nombre en la lista básica
      const filteredBasic = allPokemonBasic.filter(pokemon =>
        pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      
      // Convertir a formato compatible con PokemonCard
      return filteredBasic.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
        types: [] // Los tipos se cargarán cuando sea necesario
      }));
    }
    return paginatedPokemon || [];
  }, [isSearching, allPokemonBasic, paginatedPokemon, debouncedSearchTerm]);

  // Paginar los resultados de búsqueda
  const paginatedResults = useMemo(() => {
    if (isSearching) {
      const startIndex = currentPage * limit;
      return filteredPokemon.slice(startIndex, startIndex + limit);
    }
    return filteredPokemon;
  }, [isSearching, filteredPokemon, currentPage, limit]);

  // Calcular el total de páginas
  const totalPages = useMemo(() => {
    if (isSearching) {
      return Math.ceil(filteredPokemon.length / limit);
    }
    // Para paginación normal, estimamos basado en el total de Pokémon (1302)
    return Math.ceil(1302 / limit);
  }, [isSearching, filteredPokemon.length, limit]);

  // Resetear página cuando cambia el modo de búsqueda
  useEffect(() => {
    setCurrentPage(0);
  }, [isSearching]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  // Efecto para activar la búsqueda básica cuando cambia el término debounced
  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 0 && !allPokemonBasic) {
      refetchBasic();
    }
  }, [debouncedSearchTerm, allPokemonBasic, refetchBasic]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state solo para la carga inicial de paginación
  if (isLoadingPaginated && !searchTerm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando Pokémon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar</h2>
            <p className="text-gray-600">No se pudieron cargar los Pokémon. Intenta de nuevo.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎮 Pokédex
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explora y descubre todos los Pokémon del mundo
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isLoadingBasic ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Search Results Info */}
            {isSearching && (
              <p className="text-sm text-gray-500 mt-2">
                Encontrados {filteredPokemon.length} Pokémon para "{debouncedSearchTerm}"
              </p>
            )}
          </div>
        </div>

        {/* Pokemon Grid */}
        {isLoadingBasic && isSearching ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Buscando en todos los Pokémon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
            {paginatedResults.map((pokemon) => (
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

        {/* No Results */}
        {filteredPokemon.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron Pokémon
            </h3>
            <p className="text-gray-500">
              Intenta con otro nombre o elimina el filtro de búsqueda
            </p>
          </div>
        )}

        {/* Pagination */}
        {((isSearching && filteredPokemon.length > limit) || (!isSearching && totalPages > 1)) && (
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ← Anterior
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 text-gray-700 font-medium">
                Página {currentPage + 1} de {totalPages}
              </span>
              
              {/* Page Numbers for better navigation */}
              {totalPages <= 10 && (
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } transition-colors text-sm`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
