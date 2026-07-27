import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { AlertaService } from '../../alerta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{
  camposForm: FormGroup;
  id?: string;

  constructor(private service: CategoriaService, private alerta: AlertaService, 
              private route: ActivatedRoute, private router: Router
  ){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if(this.id){
      this.carregarCategoriaId(this.id);
      console.log('ID: ', this.id);
    }
  }

  salvar(){
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){
      this.service.salvar(this.camposForm.value)
        .subscribe({
          next: categoria => {
            console.log('Salvo com sucesso: ', categoria),
            this.camposForm.reset();
            this.alerta.sucesso('Categoria cadastrada!');
          },
          error: erro => {
            this.alerta.erro('Ocorreu um erro.');
            console.log('Ocorreu um erro: ', erro);
          }
        });
      //console.log('Valores digitados: ', this.camposForm.value);
      //console.log('Está valido? ', this.camposForm.valid);
    }
  }

  atualizar() : void{
    if(this.camposForm.invalid || !this.id){
      return;
    }

    const categoria: Categoria = {
      id: this.id,
      ...this.camposForm.value
    };

    console.log(categoria);

    this.service.atualizar(categoria).subscribe({
      next: () => {
        this.alerta.sucesso('Categoria atualizada!');
        this.router.navigate(['/paginas/categorias/consulta']);
      },
      error: () => {
        this.alerta.erro('Erro ao atualizar.');
      }
    })
  }

  carregarCategoriaId(id: string) : void {
    this.service.obterPorId(id).subscribe({
      next: categoria => {
        this.camposForm.patchValue({
          nome: categoria.nome,
          descricao: categoria.descricao
        })
      }
    })
  }

  isCampoInvalido(nomeCampo: string) : boolean{
    const campo = this.camposForm.get(nomeCampo);
    // return (campo?.invalid && campo?.touched && campo?.errors?.['required']) || false;
    return !!(campo?.touched && campo?.hasError('required'));
  }
}
