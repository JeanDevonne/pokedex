import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../services/pokemonApi';
import { useAuthStore } from '../stores/authStore';

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, capturePokemon, releasePokemon, isPokemonCaptured } = useAuthStore();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);

  const pokemonId = parseInt(id || '1');

  // Fetch Pokemon detail using getPokemonById
  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    enabled: !!pokemonId,
  });

  useEffect(() => {
    if (pokemon) {
      // Formatear los datos del Pokémon para la vista de detalles
      const formattedPokemon: PokemonDetail = {
        id: pokemon.id,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
        types: pokemon.types.map(type => type.type.name),
        height: pokemon.height * 10, // Convertir de decímetros a centímetros
        weight: pokemon.weight / 10, // Convertir de hectogramos a kilogramos
        abilities: pokemon.abilities.map(ability => ability.ability.name),
        stats: {
          hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
          attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
          defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
          specialAttack: pokemon.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
          specialDefense: pokemon.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
          speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
        }
      };
      
      setPokemonDetail(formattedPokemon);
    }
  }, [pokemon, pokemonId]);

  const isCaptured = isPokemonCaptured(pokemonId);

  const handleCaptureClick = () => {
    if (pokemonDetail) {
      if (isCaptured) {
        releasePokemon(pokemonId);
      } else {
        capturePokemon({ 
          id: pokemonId, 
          name: pokemonDetail.name, 
          image: pokemonDetail.image, 
          types: pokemonDetail.types 
        });
      }
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };
    return colors[type.toLowerCase()] || 'bg-gray-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemonDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pokémon no encontrado</h1>
          <p className="text-gray-600 mb-6">No pudimos encontrar la información de este Pokémon.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a la Pokédex
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver a la Pokédex
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <img 
                    src={pokemonDetail.image} 
                    alt={pokemonDetail.name}
                    className="w-32 h-32 object-contain drop-shadow-lg"
                    onError={(e) => {
                      // Imagen por defecto cuando falla la carga
                      e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/07/23/13/21/pokemon-1536855_640.png';
                    }}
                  />
                  {isCaptured && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ¡Capturado!
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-bold capitalize mb-2">
                    {pokemonDetail.name}
                  </h1>
                  <div className="text-2xl font-semibold mb-3">
                    #{pokemonDetail.id.toString().padStart(3, '0')}
                  </div>
                  <div className="flex gap-2">
                    {pokemonDetail.types.map((type, index) => (
                      <span 
                        key={index}
                        className={`${getTypeColor(type)} text-white text-sm font-semibold px-4 py-2 rounded-full capitalize`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capture Button */}
              {isAuthenticated && (
                <button
                  onClick={handleCaptureClick}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isCaptured 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-white hover:bg-gray-100 text-blue-600'
                  }`}
                >
                  {isCaptured ? 'Liberar Pokémon' : 'Capturar Pokémon'}
                </button>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Physical Info */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Información Física</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Altura</div>
                      <div className="text-xl font-semibold text-gray-800">
                        {pokemonDetail.height >= 100 
                          ? `${(pokemonDetail.height / 100).toFixed(1)} m` 
                          : `${pokemonDetail.height} cm`
                        }
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Peso</div>
                      <div className="text-xl font-semibold text-gray-800">{pokemonDetail.weight} kg</div>
                    </div>
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Habilidades</h2>
                  <div className="flex gap-2">
                    {pokemonDetail.abilities.map((ability, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Stats */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Estadísticas</h2>
                  <div className="space-y-2">
                    {Object.entries(pokemonDetail.stats).map(([stat, value]) => {
                      const percentage = Math.min((value / 100) * 100, 100);
                      const statName = stat === 'hp' ? 'HP' : stat === 'specialAttack' ? 'Sp. Atk' : stat === 'specialDefense' ? 'Sp. Def' : stat;
                      
                      return (
                        <div key={stat} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                          <div className="flex items-center space-x-3 flex-1">
                            <span className="text-gray-700 font-medium text-sm min-w-[60px]">
                              {statName}
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-200 ${
                                  value >= 90 ? 'bg-purple-500' :
                                  value >= 80 ? 'bg-green-500' :
                                  value >= 70 ? 'bg-blue-500' :
                                  value >= 60 ? 'bg-yellow-500' :
                                  value >= 50 ? 'bg-orange-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-800 ml-3 min-w-[25px] text-right">
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Resumen compacto */}
                  <div className="mt-3 bg-blue-50 rounded-md p-2 border border-blue-100">
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-600">
                          {Math.round(pokemonDetail.stats.hp + pokemonDetail.stats.attack + pokemonDetail.stats.defense + pokemonDetail.stats.specialAttack + pokemonDetail.stats.specialDefense + pokemonDetail.stats.speed)}
                        </div>
                        <div className="text-gray-600">BST</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-green-600">
                          {Object.values(pokemonDetail.stats).filter(stat => stat >= 80).length}
                        </div>
                        <div className="text-gray-600">Altos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-purple-600">
                          {Math.max(...Object.values(pokemonDetail.stats))}
                        </div>
                        <div className="text-gray-600">Mejor</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 