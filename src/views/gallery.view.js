// src/views/GalleryView.js

import { getGalleryItems } from "../services/supabase";
import { navigate } from "../controllers/Router";

/**
 * Função utilitária para gerar o HTML de um único Card de Imagem.
 * @param {object} item - Objeto da imagem vindo do Supabase (contendo id, url, title).
 * @returns {string} HTML do card.
 */
const GalleryCard = (item) => {
  // Usamos a função 'navigate' do Router no evento de clique para manter o fluxo SPA.
  // O link href é importante para a acessibilidade e para que o Router intercepte.
  return `
        <a href="/image/${
          item.id
        }" class="gallery-card block group cursor-pointer" data-image-id="${
    item.id
  }">
            <div class="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform group-hover:scale-[1.02]">
                <img 
                    src="${item.url}" 
                    alt="${item.title || "Imagem da Galeria"}" 
                    class="w-full h-80 object-cover"
                    loading="lazy"
                >
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                    <h3 class="text-white text-lg font-semibold truncate">
                        ${item.title || "Título Desconhecido"}
                    </h3>
                </div>
            </div>
        </a>
    `;
};

/**
 * Módulo GalleryView.
 * Gerencia a apresentação da galeria de imagens.
 */
const GalleryView = {
  /**
   * 1. Renderiza o esqueleto inicial (título e estado de carregamento).
   */
  render: () => {
    return `
            <div class="max-w-7xl mx-auto p-6 md:p-10">
                <h1 class="text-4xl md:text-5xl font-display text-brand-dark mb-10 border-b-2 border-brand-DEFAULT pb-3">
                    Galeria de Obras
                </h1>
                
                <div id="gallery-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div id="loading-state" class="col-span-full text-center py-20 text-xl text-gray-500">
                        Carregando obras de arte...
                    </div>
                </div>
            </div>
        `;
  },

  /**
   * 2. Lógica pós-renderização: Busca dados e popula a galeria.
   * @param {object} params - Parâmetros da URL.
   */
  afterRender: async (params) => {
    const container = document.getElementById("gallery-container");
    const loadingState = document.getElementById("loading-state");

    // Remove o estado de carregamento enquanto busca
    loadingState.textContent = "Buscando dados no Supabase...";

    const galleryItems = await getGalleryItems();

    if (galleryItems.length === 0) {
      // Se não houver itens
      container.innerHTML = `
                <div class="col-span-full text-center py-20 text-2xl text-red-500">
                    Nenhuma obra encontrada. Verifique a tabela 'gallery_items' no Supabase.
                </div>
            `;
      return;
    }

    // Gera o HTML de todos os cards
    const galleryHTML = galleryItems.map(GalleryCard).join("");

    // Injeta o HTML no container
    container.innerHTML = galleryHTML;

    // Opcional: Adiciona o event listener para capturar cliques e usar o Router
    // (Isso já é feito pelo Router.js, mas é bom para garantir o comportamento)
    container.querySelectorAll(".gallery-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const path = card.getAttribute("href");
        navigate(path);
      });
    });

    console.log("GalleryView renderizada com sucesso.");
  },
};

export default GalleryView;
