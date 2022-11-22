import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from '../../../shared/modal/modal.component';
import { AdministradoresService } from '../../services/administradores.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.scss'],
})
export class AdministradoresComponent implements OnInit {
  // Variables

  // Constructor
  constructor(
    public dialog: MatDialog,
    private adminServices: AdministradoresService
  ) {}

  // Ciclo de vida
  ngOnInit(): void {
    this.adminServices.getAdmins().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

  // Métodos
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
