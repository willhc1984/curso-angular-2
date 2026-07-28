import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertaService {

  constructor() { }

  sucesso(mensagem: string) : void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: mensagem,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true
    });
  }

  erro(mensagem: string) : void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: mensagem,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true
    })
  }

  aviso(mensagem: string) : void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: mensagem,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true
    })
  }

  erroModal(titulo: string, mensagem: string) : void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensagem,
      confirmButtonText: 'OK',
      confirmButtonColor: '#2563EB'
    });
  }

  confirmar(titulo: string, texto: string) : Promise<boolean> {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(resultado => resultado.isConfirmed);
  }

}
