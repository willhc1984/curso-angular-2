import { Component, OnInit } from '@angular/core';
import { PermissoesService } from '../permissoes.service';
import { AlertaService } from '../../alerta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit {

  camposForm: FormGroup;
  id?: number;

  constructor(private permissoesService: PermissoesService, private alerta: AlertaService, private route: ActivatedRoute){
    this.camposForm = new FormGroup({
      codigo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.id = id ? Number(id) : undefined

    if(this.id){
      this.carregarPermissaoId(this.id);
    }
  }

  salvar(){
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){
      this.permissoesService.salvar(this.camposForm.value)
        .subscribe({
          next: permissao => {
            this.camposForm.reset();
            this.alerta.sucesso('Permissão cadastrada.');
          },
          error: erro => {
            this.alerta.erro('Ocorreu um erro.');
          }
        });
    }
  }

  atualizar(){

  }

  carregarPermissaoId(id: number) : void{

  }

  isCampoInvalido(nomeCampo: string) : boolean{
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.hasError('required'));
  }

}
