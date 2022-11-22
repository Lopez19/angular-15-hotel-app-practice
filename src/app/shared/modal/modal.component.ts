import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradoresService } from 'src/app/hotel/services/administradores.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // Variables
  modalForm!: FormGroup;

  // Constructor
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminServices: AdministradoresService
  ) {}

  ngOnInit(): void {
    this.modalForm = new FormGroup({
      idAdmin: new FormControl(''),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      perfil: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    if (this.data.type === 'edit') {
      this.setValues();
    }
  }

  // Setear los valores del formulario
  setValues() {
    this.modalForm.setValue({
      idAdmin: this.data.administrador._id,
      nombre: this.data.administrador.nombre,
      usuario: this.data.administrador.usuario,
      password: this.data.administrador.password,
      perfil: this.data.administrador.perfil,
    });
  }

  // Métodos
  onSubmit() {
    if (this.modalForm.valid) {
      this.dialogRef.close(this.modalForm.value);
    }
  }
}
