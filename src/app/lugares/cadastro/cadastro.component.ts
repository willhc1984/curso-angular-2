import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';
import { AlertaService } from '../../alerta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lugar } from '../../models/lugar';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{

  camposForm: FormGroup;
  categorias: Categoria[] = [];
  id?: string;
  
  constructor(private categoriaService: CategoriaService, private lugarService: LugarService,
              private alerta: AlertaService, private route: ActivatedRoute, private router: Router){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    if(this.id){
      this.carregarLugarId(this.id);
      console.log('ID: ', this.id);
    }

    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => {
        console.log(this.id);
        this.categorias = listaCategorias
      }      
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

  atualizar() : void {
    if(this.camposForm.invalid || !this.id){
      return;
    } 

    const lugar: Lugar = {
      id: this.id,
      ...this.camposForm.value
    };

    this.lugarService.atualizar(lugar).subscribe({
      next: () => {
        this.alerta.sucesso('Lugar atualizado!');
        this.router.navigate(['/paginas/lugares/consulta'])
      },
      error: () => {
        this.alerta.erro('Erro ao atualizar.')
      }
    });
  }

  carregarLugarId(id: string) : void {
    this.lugarService.obterPorId(id).subscribe({
      next: lugar => {
        this.camposForm.patchValue({
          nome: lugar.nome,
          categoria: lugar.categoria,
          localizacao: lugar.localizacao,
          urlFoto: lugar.urlFoto,
          avaliacao: lugar.avaliacao
        })
      }
    });
  }

  isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required'];
  }

}
