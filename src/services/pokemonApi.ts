// Base URL de la API de Pokédex
const BASE_URL = 'https://pokeapi.co/api/v2'

// Tipos TypeScript para los datos de Pokémon
export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    front_shiny: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
}

// Tipo para los datos formateados que usa la aplicación
export interface PokemonListItem {
  id: number
  name: string
  image: string
  types: string[]
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}

// Función para obtener un Pokémon específico por ID o nombre
export const getPokemonById = async (idOrName: string | number): Promise<Pokemon> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
    if (!response.ok) {
      throw new Error(`Pokémon con ID/nombre ${idOrName} no encontrado`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error en getPokemonById:', error)
    throw error
  }
}

// Función para obtener lista de Pokémon con paginación
export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error('Error al obtener la lista de Pokémon')
    }
    const data: PokemonListResponse = await response.json()
    
    const pokemonPromises = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url)
      const pokemonData: Pokemon = await pokemonResponse.json()
      
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
        types: pokemonData.types.map((type) => type.type.name)
      }
    })
    
    return Promise.all(pokemonPromises)
  } catch (error) {
    console.error('Error en getPokemonList:', error)
    throw error
  }
}

// Función para obtener todos los Pokémon
export const getAllPokemon = async (): Promise<PokemonListItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=1302`)
    if (!response.ok) {
      throw new Error('Error al obtener todos los Pokémon')
    }
    const data: PokemonListResponse = await response.json()
    
    const pokemonPromises = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url)
      const pokemonData: Pokemon = await pokemonResponse.json()
      
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
        types: pokemonData.types.map((type) => type.type.name)
      }
    })
    
    return Promise.all(pokemonPromises)
  } catch (error) {
    console.error('Error en getAllPokemon:', error)
    throw error
  }
} 