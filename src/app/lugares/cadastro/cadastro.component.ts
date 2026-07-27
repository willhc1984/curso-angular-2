import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';
import { AlertaService } from '../../alerta.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => {
        console.log(listaCategorias);
        this.categorias = listaCategorias
      }      
    })
  }
  
  constructor(private categoriaService: CategoriaService, private lugarService: LugarService, 
              private alerta: AlertaService){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    })
  }

  salvar(){
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){
      this.lugarService.salvar(this.camposForm.value)
        .subscribe({
          next: (lugar) => {
            console.log("Cadastrado com sucesso.", lugar);
            this.camposForm.reset();
            this.alerta.sucesso('Lugar cadastrado!');
          },
          error: erro => console.log('Ocorreu um erro: ', erro)
        });
    }
  }

  isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required'];
  }

}
