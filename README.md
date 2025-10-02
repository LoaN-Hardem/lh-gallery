# 🖼️ LH Gallery

> _Single Page Application moderna para exposição de arte digital. Veja, admire e baixe sua IA favorita._

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)  
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)  
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)  
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## 📌 Visão Geral

O **LH Gallery** é uma aplicação desenvolvida para demonstrar proficiência na criação de uma **SPA (Single Page Application)** otimizada, utilizando ferramentas modernas e leves como **Vite + Vanilla JavaScript**.  
O foco está em **performance, arquitetura limpa e design minimalista**.

- 🎨 **Diferencial**: Vitrine de imagens autorais geradas por IA.
- 💰 **Oportunidade futura**: Estrutura preparada para **fluxo de pagamento via PIX** para monetização das obras.

---

## ⚙️ Arquitetura Técnica

### 📚 Stacks Principais

| Categoria     | Tecnologia      | Justificativa                                             |
| ------------- | --------------- | --------------------------------------------------------- |
| Build Tool    | **Vite.js**     | Build rápido e moderno para desenvolvimento ágil.         |
| Front-end     | **Vanilla JS**  | Foco em desempenho e domínio profundo de JavaScript puro. |
| Estilização   | **TailwindCSS** | Construção rápida de UI responsiva e moderna.             |
| Back-end/BaaS | **Supabase**    | Autenticação, Storage e API de banco de dados.            |

---

### 🏗️ Arquitetura SPA

- **Views**: Módulos responsáveis por montar e injetar o HTML (ex: `HomeView.js`, `GalleryView.js`).
- **Router**: Módulo `Router.js` utilizando **History API** para navegação sem reload.
- **Controllers/Services**: Separação da lógica de dados (Supabase) da apresentação (Views).

---

## 🗺️ Estrutura de Rotas

| Rota         | View          | Funcionalidade                                     | Estado       |
| ------------ | ------------- | -------------------------------------------------- | ------------ |
| `/`          | `HomeView`    | Landing Page inicial e descrição do projeto.       | **Fixo**     |
| `/gallery`   | `GalleryView` | Galeria principal com busca e filtros.             | **Dinâmico** |
| `/image/:id` | `ImageView`   | Exibição da obra em detalhe, download e metadados. | **Dinâmico** |

---

## 🎨 Recursos e Design

- **Paleta e tipografia modernas**, priorizando a **imagem como elemento central**.
- **Layout mobile-first** com TailwindCSS.
- **Header e Footer fixos**, garantindo fluidez na navegação SPA.
- Todas as obras são **autoria própria, geradas por IA**, trazendo exclusividade ao projeto.

---

## 🚀 Futuro do Projeto

- Integração de **API PIX** para compra das imagens.
- Melhorias na busca avançada e filtros personalizados.
- Expansão da galeria com novas coleções.

---

## 📄 Licença

Este projeto é de uso pessoal e acadêmico. Direitos reservados ao autor.

---

👤 Desenvolvido por **LH (Loan Hardem)**
