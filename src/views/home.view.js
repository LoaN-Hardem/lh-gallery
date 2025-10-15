// src/views/HomeView.js

/**
 * Módulo HomeView.
 * Define a estrutura HTML da página inicial com vídeo de fundo.
 */
const HomeView = {
  /**
   * Função para renderizar o HTML da View.
   * @returns {string} - O HTML a ser injetado no <main>.
   */
  render: () => {
    // O path do vídeo é relativo à pasta 'public' do Vite
    const videoPath = "/lh-gallery.mp4";

    // Estrutura do HTML:
    // 1. Container principal (relative, h-screen)
    // 2. Elemento <video> (absolute, object-cover, z-index -1)
    // 3. Camada de Overlay Escura (opcional, para melhorar a leitura do texto, z-index 0)
    // 4. Conteúdo do Texto (z-index 10, centralizado)

    return `
            <section class="relative h-screen flex items-center justify-center overflow-hidden">
                
                <video 
                    autoplay 
                    loop 
                    muted 
                    playsinline 
                    class="absolute top-0 left-0 w-full h-full object-cover z-0"
                    id="background-video"
                >
                    <source src="${videoPath}" type="video/mp4">
                    Seu navegador não suporta a tag de vídeo.
                </video>
                
                <div class="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
                
                <div class="relative text-center z-20 text-white p-6 md:p-12">
                    <h1 class="text-7xl md:text-8xl font-display font-extrabold tracking-widest uppercase mb-2 drop-shadow-lg">
                        LH GALLERY
                    </h1>
                    <p class="text-xl md:text-2xl font-sans font-light tracking-widest uppercase mb-10 drop-shadow-md">
                        LOAN HARDEM
                    </p>
                    
                    <a href="/gallery" class="inline-block px-10 py-4 text-xl font-semibold text-white border-2 border-white rounded-lg shadow-xl bg-transparent hover:bg-white hover:text-black transition duration-300 transform hover:scale-105">
                        Explorar Coleção
                    </a>
                </div>
                
            </section>
        `;
  },

  /**
   * Lógica pós-renderização.
   */
  afterRender: () => {
    console.log("HomeView com vídeo renderizada e pronta.");

    // Garantir que o container <main> utilize toda a altura da tela
    const main = document.getElementById("app-content");
    if (main) {
      // Opcional: Garante que o main container não introduza margens indesejadas
      main.classList.add("p-0", "m-0");
    }

    // Tenta iniciar a reprodução do vídeo (Alguns navegadores bloqueiam o autoplay)
    const video = document.getElementById("background-video");
    if (video) {
      video.play().catch((error) => {
        console.warn(
          "Autoplay do vídeo bloqueado. Clique para interagir.",
          error
        );
      });
    }
  },
};

export default HomeView;
