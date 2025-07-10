import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export const PokemonCard = ({ id, name, image, types }: PokemonCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, capturePokemon, releasePokemon, isPokemonCaptured } = useAuthStore();
  
  const isCaptured = isPokemonCaptured(id);

  const handleCardClick = () => {
    navigate(`/pokemon/${id}`);
  };

  const handleCaptureClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se ejecute el onClick del card
    
    if (isCaptured) {
      releasePokemon(id);
    } else {
      capturePokemon({ id, name, image, types });
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

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-200 overflow-hidden relative group"
      onClick={handleCardClick}
    >
      {/* Capture Button */}
      {isAuthenticated && (
        <button
          onClick={handleCaptureClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
            isCaptured 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-300'
          }`}
          title={isCaptured ? 'Liberar Pokémon' : 'Capturar Pokémon'}
        >
          {isCaptured ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}

      {/* Captured Badge */}
      {isCaptured && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ¡Capturado!
        </div>
      )}

      {/* Pokemon Image */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex justify-center">
        <img 
          src={image} 
          alt={name}
          className="w-32 h-32 object-contain drop-shadow-lg"
          loading="lazy"
          onError={(e) => {
            // Imagen por defecto cuando falla la carga
            e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/07/23/13/21/pokemon-1536855_640.png';
          }}
        />
      </div>

      {/* Pokemon Info */}
      <div className="p-4">
        {/* ID and Name */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 capitalize">
            {name}
          </h3>
          <span className="text-sm font-semibold text-gray-500">
            #{id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* Types */}
        <div className="flex gap-2">
          {types.map((type, index) => (
            <span 
              key={index}
              className={`${getTypeColor(type)} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Click hint */}
        <div className="mt-3 text-xs text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          Haz clic para ver más detalles
        </div>
      </div>
    </div>
  );
}; 