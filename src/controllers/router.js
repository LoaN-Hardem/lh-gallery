// src/controllers/Router.js

/**
 * Ponto de injeção de conteúdo na SPA.
 * Ele deve corresponder ao ID no seu index.html: <main id="app-content">
 */
const appContent = document.getElementById("app-content");

// Mapeamento das rotas para as Views
const routes = {
  "/": "home", // Será carregado de src/views/HomeView.js
  "/gallery": "gallery", // Será carregado de src/views/GalleryView.js
  "/image/:id": "image", // Será carregado de src/views/ImageView.js
};

/**
 * 1. Mapeia a URL atual para uma View correspondente e injeta o HTML.
 * @param {string} pathname - O caminho da URL (ex: /, /gallery, /image/123)
 */
async function navigateTo(pathname) {
  let match = null;
  let params = {};

  // 1. Encontrar a rota correspondente
  for (const [routePath, viewName] of Object.entries(routes)) {
    // Regex para rotas dinâmicas como '/image/:id'
    const routeRegex = new RegExp(
      "^" + routePath.replace(/:[a-zA-Z]+/g, "([a-zA-Z0-9_-]+)") + "$"
    );
    const urlMatch = pathname.match(routeRegex);

    if (urlMatch) {
      match = viewName;
      // Extrair parâmetros da URL (ex: o ID da imagem)
      const paramNames = (routePath.match(/:[a-zA-Z]+/g) || []).map((p) =>
        p.substring(1)
      );
      const paramValues = urlMatch.slice(1);
      paramNames.forEach((name, index) => {
        params[name] = paramValues[index];
      });
      break;
    }
  }

  if (!match) {
    // Caso a rota não seja encontrada (tratar como 404)
    appContent.innerHTML = "<h1>404: Página não encontrada!</h1>";
    document.title = "LH Gallery | 404";
    return;
  }

  try {
    // 2. Carregamento Dinâmico (Lazy Loading) da View correspondente
    const viewModule = await import(`../views/${match}.view.js`);
    const View = viewModule.default;

    // 3. Renderizar a View e injetar no conteúdo
    // Passamos os parâmetros da URL para a View (ex: {id: 123})
    appContent.innerHTML = View.render(params);
    document.title = `LH Gallery | ${match}`;

    // 4. Executar lógica pós-renderização (ex: adicionar event listeners)
    if (View.afterRender) {
      View.afterRender(params);
    }
  } catch (error) {
    console.error("Erro ao carregar ou renderizar a View:", error);
    appContent.innerHTML = "<h1>Erro ao carregar a aplicação.</h1>";
  }
}

/**
 * 2. Gerencia a navegação com o History API para SPA.
 * @param {string} pathname - O caminho para onde navegar.
 */
export const navigate = (pathname) => {
  window.history.pushState({}, pathname, pathname);
  navigateTo(pathname);
};

/**
 * 3. Inicializa o roteador.
 */
export const initializeRouter = () => {
  // 1. Carregar a rota inicial (ao abrir o app)
  navigateTo(window.location.pathname);

  // 2. Escutar o evento 'popstate' (usuário clica em Voltar/Avançar no navegador)
  window.addEventListener("popstate", () => {
    navigateTo(window.location.pathname);
  });

  // 3. Interceptar cliques em links internos para evitar reload
  document.body.addEventListener("click", (e) => {
    // Verifica se o clique foi em um <a> tag e se é um link interno
    const link = e.target.closest("a");
    if (link && link.origin === window.location.origin) {
      e.preventDefault();
      // Usa nossa função de navegação SPA
      navigate(link.pathname);
    }
  });
};
