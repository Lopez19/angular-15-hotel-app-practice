import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdministradoresService {
  // Variables
  private url = 'http://localhost:3000/api/';

  // Constructor
  constructor(private http: HttpClient) {}

  // Método para guardar un administrador
  saveAdmin(admin: any): any {
    if (admin !== true) {
      return this.http.post(`${this.url}administradores`, admin);
    }
  }

  // Método para obtener todos los administradores
  getAdmins(): any {
    return this.http.get(`${this.url}administradores`);
  }

  // Método para editar un administrador
  updateAdmin(admin: any): any {
    return this.http.put(`${this.url}administradores/${admin.idAdmin}`, admin);
  }

  // Método para eliminar un administrador
}
