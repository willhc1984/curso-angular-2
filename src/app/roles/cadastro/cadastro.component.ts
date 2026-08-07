import { Component, OnInit } from '@angular/core';
import { LISTA_PERMISSOES } from '../../models/lista-permissoes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../../models/roles';
import { AlertaService } from '../../alerta.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{

  permissoes = LISTA_PERMISSOES;
  camposForm: FormGroup;
  id?: string;

  constructor(private roleService: RoleService, private alerta: AlertaService, private router: Router, private route: ActivatedRoute){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),

      permissoes: new FormArray(
        this.permissoes.map(() => new FormControl(false))
      )
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if(this.id){
      this.carregarRoleId(this.id);
    }
  };

  salvar(){
    console.log('FORM:', this.camposForm.value);
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){    
      const role: Role = {
        nome: this.camposForm.value.nome,
        descricao: this.camposForm.value.descricao,
        permissoes: this.buscaPermissoes()
      };

      console.log('ROLE ENVIADA:', role);

      this.roleService.salvar(role).subscribe({
        next: (role) => {
          this.camposForm.reset();
          this.alerta.sucesso('Papel cadastrado');
        },
        error: erro => {
          this.alerta.erro('Erro ao cadastrar');
        }
      });
    }      
  }

  atualizar() : void {
    if(this.camposForm.invalid || !this.id){
      return;
    }

    const role: Role = {
      id: this.id,
      nome: this.camposForm.value.nome,
      descricao: this.camposForm.value.descricao,
      permissoes: this.buscaPermissoes()
    }

    this.roleService.atualizar(role).subscribe({
      next: () => {
        this.alerta.sucesso('Papel atualizado!');
        this.router.navigate(['/paginas/papeis/cadastro']);
      }
    });
  }

  carregarRoleId(id: string) : void {
    this.roleService.obterPorId(id).subscribe({
      next: role => {
        this.camposForm.patchValue({
          nome: role.nome,
          descricao: role.descricao,
          permissoes: this.permissoes.map(p => role.permissoes.includes(p.codigo))
        })
        //console.log(this.camposForm.value);
        //console.log(role);
      }
    })
  }

  buscaPermissoes(){
    const permissoesSelecionadas = this.permissoes
        .filter((_, index) => this.camposForm.value.permissoes[index])
        .map(p => p.codigo);    
    return permissoesSelecionadas;
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.hasError('required'));
  }

}
