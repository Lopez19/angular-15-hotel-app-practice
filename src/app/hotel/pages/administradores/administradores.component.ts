import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { ModalComponent } from '../../../shared/modal/modal.component';
import { AdministradoresService } from '../../services/administradores.service';
import { Person } from '../../interfaces/person.interface';

// Alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss'],
})
export class AdministradoresComponent implements OnDestroy, OnInit {
  // Decoradores
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

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
    this.getAdmins();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // GetAdmins
  getAdmins() {
    const opciones = (this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      columnDefs: [
        { orderable: false, targets: [0, 1, 2, 3, 4] },
        { searchable: false, targets: [0] },
        { width: '3%', targets: 0 },
        { width: '17%', targets: 4 },
        { className: 'text-center', targets: [0, 2, 3, 4] },
      ],
      responsive: {
        details: {
          type: 'column',
          target: 'tr',
        },
      },
    });

    this.adminServices.getAdmins().subscribe((data: any) => {
      this.persons = data;
      this.dtTrigger.next(opciones);
    });
  }

  // Recarga la tabla
  recharge() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getAdmins();
    });
  }

  // Métodos
  // Modal para crear un nuevo administrador
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
            localStorage.setItem('token', data.token);
            this.recharge();
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
          complete: () => {
            Swal.fire(
              'Creado',
              'El administrador se creó correctamente',
              'success'
            );
          },
        });
      } else {
        console.log('No hay datos');
      }
    });
  }

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
      if (result) {
        this.adminServices.updateAdmin(result).subscribe({
          next: () => {
            this.recharge();
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
          complete: () => {
            Swal.fire(
              'Actualizado',
              'El administrador se actualizó correctamente',
              'success'
            );
          },
        });
      } else {
        console.log('No hay datos');
      }
    });
  }

  // Modal para eliminar un administrador
  onDelete(adminDeleted: string) {
    if (adminDeleted === '637c33207fbac4106309fd6d') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes eliminar este administrador',
      });
      return;
    }

    if (adminDeleted === localStorage.getItem('id')) {
      Swal.fire('Error', 'No puedes eliminar tu propio usuario', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir, el administrador será eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value === true) {
        this.adminServices.deleteAdmin(adminDeleted).subscribe({
          next: () => {
            this.recharge();
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
          complete: () => {
            Swal.fire(
              'Eliminado',
              'El administrador se eliminó correctamente',
              'success'
            );
          },
        });
      }

      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El administrador no se eliminó', 'error');
      }
    });
  }
}
