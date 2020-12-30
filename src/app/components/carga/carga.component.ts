import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item.model';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  public mouseOverPlace: boolean = false;
  public archivos: FileItem[] = [];

  constructor(
    private _cargaImagenes: CargaImagenesService
  ) { }

  ngOnInit(): void {
  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }
  
  limpiarArchivos() {
    this.archivos = [];
  }
}
