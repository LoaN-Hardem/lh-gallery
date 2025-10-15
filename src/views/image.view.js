// src/views/image.view.js

import { getGalleryItems } from "../services/supabase";

/**
 * Módulo ImageView.
 * Gerencia a visualização em detalhe de uma única imagem.
 */
const ImageView = {
  /**
   * 1. Renderiza o esqueleto.
   * @param {object} params - Parâmetros da URL (ex: { id: '123' }).
   */
  render: (params) => {
    // O ID é o índice temporário da imagem na lista que o GalleryView gerou
    const imageId = params.id;

    return `
      <div class="max-w-4xl mx-auto p-6 md:p-10">
        <button id="back-button" class="text-brand-DEFAULT hover:text-brand-dark mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para a Galeria
        </button>

        <div id="image-detail-container">
          <div class="text-center py-20 text-xl text-gray-500">
            Carregando detalhes da obra ID: ${imageId}...
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 2. Lógica pós-renderização: Busca os detalhes e popula o container.
   * @param {object} params - Parâmetros da URL.
   */
  afterRender: async (params) => {
    const container = document.getElementById("image-detail-container");
    const imageId = parseInt(params.id);

    // --- Lógica de busca da imagem ---
    // Já que estamos listando do Storage, buscamos a lista inteira novamente
    // e filtramos pelo ID (índice) temporário.
    const galleryItems = await getGalleryItems();
    const item = galleryItems.find((i) => i.id === imageId);

    if (!item) {
      container.innerHTML = `
            <div class="text-center py-20 text-2xl text-red-500">
                Obra com ID ${imageId} não encontrada.
            </div>
        `;
      return;
    }

    // --- 3. Montar o HTML de Detalhes e Botão de Download ---
    container.innerHTML = `
      <div class="bg-white shadow-xl rounded-xl overflow-hidden md:flex">
          
          <div class="md:w-2/3 bg-gray-100 flex items-center justify-center p-4">
              <img 
                  src="${item.url}" 
                  alt="${item.title}" 
                  class="max-h-96 object-contain rounded-lg shadow-md"
              >
          </div>
          
          <div class="md:w-1/3 p-6 flex flex-col justify-between">
              <div>
                  <h2 class="text-3xl font-display font-bold text-brand-dark mb-2">${
                    item.title
                  }</h2>
                  <p class="text-gray-600 mb-6">
                      Detalhes básicos da obra.
                  </p>
              </div>

              <a href="${item.url}" download="${item.title}" 
                 id="download-button"
                 class="w-full inline-block text-center px-6 py-3 text-lg font-semibold text-white bg-brand-DEFAULT rounded-lg hover:bg-brand-dark transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download (${item.title.substring(0, 10)}...)
              </a>
          </div>
      </div>
    `;

    // --- 4. Adicionar Listeners de Navegação ---
    // Usamos window.history.back() para voltar à galeria.
    document.getElementById("back-button").addEventListener("click", (e) => {
      e.preventDefault();
      window.history.back();
    });
  },
};

export default ImageView;
