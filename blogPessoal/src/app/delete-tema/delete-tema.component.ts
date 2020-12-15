import { Router, ActivatedRoute } from '@angular/router';
import { TemaService } from './../service/tema.service';
import { Tema } from './../model/Tema';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-delete-tema',
  templateUrl: './delete-tema.component.html',
  styleUrls: ['./delete-tema.component.css']
})
export class DeleteTemaComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    let id:number = this.route.snapshot.params["id"];
    this.findByIdTema(id)

  }

  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    });
  }

  btnSim() {
    if (this.tema.postagem.length != 0) {
      this.alert.showAlertDanger ('Esse tema não pode ser modificado, pois já pertence a uma postagem.')
      this.router.navigate(['/cadastro-tema'])
    } else {
      this.temaService.deleteTema(this.tema.id).subscribe(() => {
        this.router.navigate(['/cadastro-tema'])
        this.alert.showAlertSuccess ('Tema apagado com sucesso!')
      })
    }

  }

  btnNao() {
    this.router.navigate(['/cadastro-tema'])
  }

}