export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🎮</span>
              <h3 className="text-2xl font-bold">Pokédex</h3>
            </div>
            <p className="text-red-100 text-sm leading-relaxed mb-4">
              Tu compañero definitivo para explorar el mundo Pokémon. Descubre, 
              colecciona y aprende sobre todos los Pokémon de todas las regiones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-red-200 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-red-200 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-red-200 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Explorar</h4>
            <ul className="space-y-2">
              <li><a href="/pokemon" className="text-red-100 hover:text-white transition-colors">Todos los Pokémon</a></li>
              <li><a href="/types" className="text-red-100 hover:text-white transition-colors">Tipos</a></li>
              <li><a href="/regions" className="text-red-100 hover:text-white transition-colors">Regiones</a></li>
              <li><a href="/favorites" className="text-red-100 hover:text-white transition-colors">Mis Favoritos</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Soporte</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-red-100 hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="/contact" className="text-red-100 hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/about" className="text-red-100 hover:text-white transition-colors">Acerca de</a></li>
              <li><a href="/privacy" className="text-red-100 hover:text-white transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-red-200 text-sm">
              © 2024 Pokédex. Todos los derechos reservados. Pokémon y todos los nombres relacionados son marcas registradas de Nintendo.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-red-200">Hecho con ❤️ para entrenadores Pokémon</span>
              <span className="text-yellow-300">⚡</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
