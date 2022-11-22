import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { ModalComponent } from '../../../shared/modal/modal.component';
import { AdministradoresService } from '../../services/administradores.service';
import { Person } from '../../interfaces/person.interface';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss'],
})
export class AdministradoresComponent implements OnInit, OnDestroy {
  // Variables
  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  // Constructor
  constructor(
    public dialog: MatDialog,
    private adminServices: AdministradoresService
  ) {}

  // Ciclo de vida
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json',
      },
    };

    this.adminServices.getAdmins().subscribe((data: any) => {
      this.persons = data;
      this.dtTrigger.next(this.persons);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Métodos
  // Modal para editar un administrador
  onEdit(administrador: Person) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: {
        title: 'Editar Administrador',
        type: 'edit',
        action: 'Editar',
        administrador: {
          _id: administrador._id,
          nombre: administrador.nombre,
          usuario: administrador.usuario,
          password: administrador.password,
          perfil: administrador.perfil,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.adminServices.updateAdmin(result).subscribe({
          next: (data: any) => {},
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
      } else {
        console.log('No hay datos');
      }
    });
  }

  // Modal para eliminar un administrador
  onDelete(administrador: Person) {
    console.log(administrador);
  }

  // Modal para agregar un nuevo administrador
  onCreate() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: {
        title: 'Crear Administrador',
        type: 'create',
        action: 'Crear',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminServices.saveAdmin(result).subscribe({
          next: (data: any) => {
            console.log(data);
            localStorage.setItem('token', data.token);
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
      } else {
        console.log('No hay datos');
      }
    });
  }
}
