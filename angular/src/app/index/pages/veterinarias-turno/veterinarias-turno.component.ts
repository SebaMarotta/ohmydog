import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from 'src/app/services/auth.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-veterinarias-turno',
  templateUrl: './veterinarias-turno.component.html',
  styleUrls: ['./veterinarias-turno.component.css']
})
export class VeterinariasTurnoComponent {

  constructor (
    private authService: AuthService,
    private pdfService: PdfService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    ){}
  protected admin = this.authService.isAdmin;
  protected pdf : any;

  @Output() cerrarModal: EventEmitter<Boolean> = new EventEmitter();
  displayMaximizable: boolean;

  @ViewChild('input', { static: false }) input!: ElementRef

  ngOnInit(){
    this.pdfService.getPDF().subscribe(resp => {
      const pdfBlob = new Blob([resp], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }


  imageSelected(event){
    let pdf: File = event.target.files[0];
    if (!pdf.name.endsWith(".pdf")){
      this.messageService.add({
        severity: 'error',
        summary: `Error`,
        detail: `Solo se permiten archivos con extension .pdf`,
        closable: true,
        sticky: false,
      });
      this.input.nativeElement.value = "";
      return null;
    }
    this.pdfService.setPDF(pdf).subscribe(
      resp => {
        this.cerrar();
      }
    );
  }

  cerrar(){
    this.cerrarModal.emit(false);
  }

}
