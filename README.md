# 🎮 Pokédex React App

Una aplicación web moderna de Pokédex construida con React, TypeScript y Vite. Explora y descubre todos los Pokémon del mundo con una interfaz intuitiva y funcionalidades como búsqueda, paginación y captura de Pokémon.

## 🌐 Live Demo

**¡Prueba la aplicación ahora!** → [Ver Demo](https://pokedex-one-drab-93.vercel.app/)

---

## ✨ Características

- 🔍 **Búsqueda de Pokémon**: Busca Pokémon por nombre en tiempo real
- 📄 **Paginación**: Navega fácilmente entre páginas de Pokémon
- 🎯 **Captura de Pokémon**: Sistema de captura con autenticación simulada
- 📱 **Diseño Responsivo**: Optimizado para móviles y escritorio
- ⚡ **Performance**: Caché inteligente con React Query
- 🎨 **UI Moderna**: Diseño atractivo con Tailwind CSS

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **React Query** - Gestión de estado y caché
- **Zustand** - Estado global
- **Tailwind CSS** - Framework de CSS

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

Puedes verificar las versiones con:

```bash
node --version
npm --version
```

## 🛠️ Instalación

> 💡 **Tip**: ¿Quieres ver la aplicación funcionando antes de instalarla? [Ver Demo](https://pokedex-one-drab-93.vercel.app/)

1. **Clona el repositorio**

```bash
git clone <url-del-repositorio>
cd pokedex
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

4. **Abre tu navegador**
   La aplicación estará disponible en: `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── layout/         # Componentes de layout (Header, Footer)
│   └── ui/             # Componentes de UI (PokemonCard)
├── pages/              # Páginas de la aplicación
│   ├── HomePage.tsx    # Página principal con lista de Pokémon
│   ├── FavoritesPage.tsx # Página de Pokémon capturados
│   └── PokemonDetailPage.tsx # Página de detalles
├── services/           # Servicios de API
│   └── pokemonApi.ts   # Funciones para comunicarse con PokeAPI
├── stores/             # Estado global
│   └── authStore.ts    # Store de autenticación y Pokémon capturados
└── App.tsx             # Componente principal
```

## 🎮 Cómo Usar

### Navegación

- **Página Principal**: Lista de Pokémon con paginación
- **Búsqueda**: Escribe en el campo de búsqueda para filtrar Pokémon
- **Detalles**: Haz clic en cualquier Pokémon para ver sus detalles
- **Favoritos**: Accede a tus Pokémon capturados (requiere login)

### Autenticación

Para probar la funcionalidad de captura, usa estos usuarios de prueba:

- **Email**: `ash@pokemon.com` / **Contraseña**: `pokemon123`
- **Email**: `misty@pokemon.com` / **Contraseña**: `pokemon123`
- **Email**: `brock@pokemon.com` / **Contraseña**: `pokemon123`
- **Email**: `pikachu@pokemon.com` / **Contraseña**: `pokemon123`
- **Email**: `professor@pokemon.com` / **Contraseña**: `pokemon123`

### Captura de Pokémon

1. Inicia sesión con cualquier usuario de prueba
2. Navega por la lista de Pokémon
3. Haz clic en el botón "+" para capturar un Pokémon
4. Ve a "Mis Pokémon" para ver tus capturas

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Build
npm run build        # Construye la aplicación para producción

# Linting
npm run lint         # Ejecuta ESLint para verificar el código

# Preview
npm run preview      # Previsualiza la build de producción
```

## 🔧 Configuración

### Variables de Entorno

El proyecto no requiere variables de entorno ya que usa la API pública de Pokémon.

### API

La aplicación utiliza la [PokeAPI](https://pokeapi.co/) que es gratuita y no requiere autenticación.

## 🐛 Solución de Problemas

### Error de dependencias

```bash
# Limpia la caché de npm
npm cache clean --force

# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error de puerto ocupado

Si el puerto 5173 está ocupado, Vite automáticamente usará el siguiente puerto disponible.

### Problemas de TypeScript

```bash
# Verifica los tipos
npx tsc --noEmit
```

## 📱 Características Técnicas

- **Caché Inteligente**: React Query maneja el caché automáticamente
- **Lazy Loading**: Las imágenes se cargan bajo demanda
- **Error Boundaries**: Manejo robusto de errores
- **Responsive Design**: Optimizado para todos los dispositivos
- **TypeScript**: Tipado completo para mejor desarrollo

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [PokeAPI](https://pokeapi.co/) por proporcionar la API de Pokémon
- [Pokémon Company](https://www.pokemon.com/) por crear el universo Pokémon
- La comunidad de React y todas las librerías utilizadas

---

¡Disfruta explorando el mundo Pokémon! 🎮✨
