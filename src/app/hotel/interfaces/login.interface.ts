export interface Login {
  token: string;
  data: Data;
}

export interface Data {
  _id: string;
  nombre: string;
  usuario: string;
  password: string;
  perfil: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
