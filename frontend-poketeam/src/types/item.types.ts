export interface Item {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string; // <--- CORREGIDO
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemInput {
  nombre: string;
  descripcion: string;
  imagen: string; // <--- CORREGIDO
}

export type UpdateItemInput = Partial<CreateItemInput>;
