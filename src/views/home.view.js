// src/views/HomeView.js

/**
 * O módulo HomeView define a estrutura HTML da página inicial.
 * Uma View é responsável por construir a interface.
 */
const HomeView = {
  /**
   * Função para renderizar o HTML da View.
   * @param {object} params - Parâmetros da URL, se houver.
   * @returns {string} - O HTML a ser injetado no <main>.
   */
  render: (params) => {
    // Usando classes Tailwind para um layout inicial
    return `
            <section class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div class="text-center max-w-2xl">
                    <h1 class="text-6xl font-display text-brand-dark mb-4">
                        Bem-vindo(a) à LH Gallery
                    </h1>
                    <p class="text-xl text-gray-700 mb-8">
                        Sua vitrine exclusiva de arte digital, criada inteiramente com Inteligência Artificial.
                        Um projeto SPA construído com **Vanilla JS**, **Vite** e **Tailwind CSS**.
                    </p>
                    <a href="/gallery" class="inline-block px-8 py-3 text-lg font-semibold text-white bg-brand-DEFAULT rounded-lg shadow-lg hover:bg-brand-dark transition duration-300">
                        Explorar Galeria
                    </a>
                </div>
            </section>
        `;
  },

  /**
   * Função opcional para adicionar lógica após a renderização (event listeners, etc.)
   * @param {object} params - Parâmetros da URL.
   */
  afterRender: (params) => {
    console.log("HomeView renderizada e pronta.");
    // Não precisamos de lógica complexa aqui ainda.
  },
};

export default HomeView;
