import { api } from "./api";

export interface Movimento {
  id: number;
  data: string;
  valor: number;
  tipo_movimento: string;
  idConta: number;
  idCategoria: number;
}

export interface CategoryType {
  id: number,
  nome: string,
}

export async function getMovimentos(): Promise<Movimento[]> {
  const response = await api.get<Movimento[]>(
    "movimentos"
  );

  return response.data;
}

export async function getCategoriaById(id: number): Promise<string> {
  const response = await api.get<CategoryType>(`/categoria/${id}`)

  return response.data.nome;
}