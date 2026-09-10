import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../../models/roles';
import { AlertaService } from '../../alerta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permissao } from '../../models/permissions';
import { PermissoesService } from '../../permissoes/permissoes.service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{

  permissoes: Permissao[] = [];
  camposForm: FormGroup;
  id?: number;

  constructor(private roleService: RoleService, private alerta: AlertaService, private router: Router, 
            private route: ActivatedRoute, private permissoesService: PermissoesService){
      this.camposForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        permissoes: new FormArray([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.id = id ? Number(id) : undefined;
    this.carregarPermissoes();
  };

  salvar(): void{
    this.camposForm.markAllAsTouched();
    
    if(this.camposForm.invalid){ 
      return;   
    }

    const role: Role = {
      nome: this.camposForm.value.nome,
      descricao: this.camposForm.value.descricao,
      permissoesIds: this.buscaPermissoes()
    };

    this.roleService.salvar(role).subscribe({
      next: () => {
        this.camposForm.reset();
        this.alerta.sucesso('Papel cadastrado.');
      },
      error: erro => {
        this.alerta.erro('Erro ao cadastrar');
      }
    });    
  }

  atualizar() : void {
    if(this.camposForm.invalid || !this.id){
      return;
    }

    const role: Role = {
      id: this.id,
      nome: this.camposForm.value.nome,
      descricao: this.camposForm.value.descricao,
      permissoesIds: this.buscaPermissoes()
    }

    this.roleService.atualizar(role).subscribe({
      next: () => {
        this.alerta.sucesso('Papel atualizado!');
        this.router.navigate(['/paginas/papeis/consulta']);
      }
    });
  }

  carregarRoleId(id: number) : void {
    this.roleService.obterPorId(id).subscribe({
      next: role => {
        this.camposForm.patchValue({
          nome: role.nome,
          descricao: role.descricao
        });

        const formArray = this.camposForm.get('permissoes') as FormArray;

        this.permissoes.forEach((permissao, index) => {
          const selecionada = role.permissoes.some(
            p => p.id === permissao.id
          );

          formArray.at(index).setValue(selecionada);
        });

        console.log(role);
      }
    })
  }

  //Carrega permissões em salvar
  carregarPermissoes(): void {
    this.permissoesService.obterTodas().subscribe({
      next: permissoes => {
        this.permissoes = permissoes;
        const formArray = this.camposForm.get('permissoes') as FormArray;

        this.permissoes.forEach(() => {
          formArray.push(new FormControl(false));
        })

        if(this.id){
          this.carregarRoleId(this.id);
        }
      },
      error: erro => {
        console.log('Erro ao carregar permissões: ', erro);
        this.alerta.erro('Erro ao carregar permissões.');
      }
    });
  }

  //Busca permissões selecionadas antes de salvar
  buscaPermissoes(): number[]{
    const formArray = this.camposForm.get('permissoes') as FormArray;

    return this.permissoes
      .filter((_, index) => formArray.at(index).value)
      .map(permissao => permissao.id);
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.hasError('required'));
  }

}
