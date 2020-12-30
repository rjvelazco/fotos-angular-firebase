import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';

@Directive({
  selector: '[appFotosUpload]'
})
export class FotosUploadDirective implements OnInit {

  @Input() archivos: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter;
  
  constructor(
    public el: ElementRef
  ) { 
    console.log('It works')
  }

  ngOnInit() {
    
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this._prevenirDetener(event);
    this.mouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this._prevenirDetener(event);
    this.mouseOver.emit(false);

    const transferencia = this._getTransferencia(event);

    console.log('transferencia: ', transferencia);

    // ---- transferencia.files posee los archivos/fotos.
    console.log('transferencia.files: ', transferencia.files);

    if (!transferencia) {
      return;
    } else {
      this._extraerArchivos(transferencia.files);
    }

  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {

    Object.values(archivosLista).forEach(archivo => {  
      if (this._archivoPuedeSerCargado(archivo)) {
        const nuevoArchivo = new FileItem(archivo);
        this.archivos.push(nuevoArchivo);
      }
    });

    console.log('Archivos extraidos: ',this.archivos);
  }

  // Validaciones
  private _archivoPuedeSerCargado(archivo: File): boolean{
    if (!this._archivoDroppeadoAgain(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false
    }
  }

  private _prevenirDetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoDroppeadoAgain( archivoName: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == archivoName) {
        console.log('El archivo ' + archivoName + ' ya esta agregadoo');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo: string): boolean{
    return (tipoArchivo == '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
