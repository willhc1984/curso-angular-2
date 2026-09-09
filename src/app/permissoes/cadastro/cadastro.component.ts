import { Component, OnInit } from '@angular/core';
import { PermissoesService } from '../permissoes.service';
import { AlertaService } from '../../alerta.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissao } from '../../models/permissions';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit {

  camposForm: FormGroup;
  id?: number;

  constructor(private permissoesService: PermissoesService, private alerta: AlertaService, private route: ActivatedRoute, private router: Router){
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

  atualizar() : void{
    if(this.camposForm.invalid || !this.id){
      return;
    }

    const permissao: Permissao = {
      id: this.id,
      ...this.camposForm.value
    };

    this.permissoesService.atualizar(permissao).subscribe({
      next: () => {
        this.alerta.sucesso('Permissão atualizada.');
        this.router.navigate(['/paginas/permissoes/consulta']);
      },
      error: () => {
        this.alerta.erro('Erro ao atualizar.');
      }
    });
  }

  carregarPermissaoId(id: number) : void{
    this.permissoesService.obterPorId(id).subscribe({
      next: permissao => {
        this.camposForm.patchValue({
          codigo: permissao.codigo,
          descricao: permissao.descricao
        })
      }
    });
  }

  isCampoInvalido(nomeCampo: string) : boolean{
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.hasError('required'));
  }

}
