// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "ERRO: As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não estão definidas."
  );
}

// Inicializa o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = "galeria-imagens"; // <--- ATENÇÃO: USE O NOME EXATO DO SEU BUCKET!
const PUBLIC_URL_BASE = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}`;

/**
 * Função para buscar TODOS os arquivos diretamente do Supabase Storage.
 * Retorna uma lista de objetos (ID, URL e Título) no formato que a View espera.
 *
 * @returns {Promise<Array<Object>>} Uma promessa que resolve com a lista de itens.
 */
export async function getGalleryItems() {
  console.log("Buscando itens do Storage...");

  // 1. Listar os objetos (arquivos) no bucket
  const { data: files, error: listError } = await supabase.storage
    .from(BUCKET_NAME)
    .list("", {
      limit: 100, // Limite de itens para buscar
      sortBy: { column: "name", order: "asc" }, // Ordenação opcional
    });

  if (listError) {
    console.error("Erro ao listar arquivos do Supabase Storage:", listError);
    return [];
  }

  // 2. Mapear os arquivos para o formato esperado pelo GalleryView (id, url, title)
  // O GalleryView espera 'url' e 'title'
  const galleryItems = files
    .filter((file) => file.name !== ".emptyFolderPlaceholder") // Ignorar o placeholder se existir
    .map((file, index) => {
      // Constrói o URL público completo
      const publicUrl = `${PUBLIC_URL_BASE}/${file.name}`;

      return {
        id: index + 1, // ID temporário, pois não há tabela DB
        title: file.name.split(".")[0].replace(/[-_]/g, " "), // Título a partir do nome do arquivo
        url: publicUrl,
      };
    });

  console.log(`Itens encontrados: ${galleryItems.length}`);
  return galleryItems;
}
