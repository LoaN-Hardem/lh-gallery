// src/main.js
import { initializeRouter } from "./controllers/router.js";

// Importa o arquivo de estilos (que inclui o Tailwind)
import "./styles/style.css";

// Removemos a injeção de HTML do template padrão do Vite

// Adicionamos o Header e Footer fixos (apenas o esqueleto com classes Tailwind)
document.getElementById("app-header").innerHTML = `
    <nav class="bg-white shadow-md p-4 sticky top-0 z-10">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a href="/" class="text-3xl font-display text-brand-DEFAULT hover:text-brand-dark">
                LH Gallery
            </a>
            <div class="space-x-4">
                <a href="/" class="text-gray-700 hover:text-brand-DEFAULT transition">Home</a>
                <a href="/gallery" class="text-gray-700 hover:text-brand-DEFAULT transition">Galeria</a>
            </div>
        </div>
    </nav>
`;

document.getElementById("app-footer").innerHTML = `
    <footer class="bg-black text-white p-6">
        <div class="max-w-7xl mx-auto text-center text-sm">
            © 2025 LH Gallery. Todos os direitos reservados.
        </div>
    </footer>
`;

// Inicializa o Router para carregar a View correta
initializeRouter();
