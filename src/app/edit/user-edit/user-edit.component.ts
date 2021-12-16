import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number

  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUser(this.idUsuario)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.id = this.idUsuario
    this.usuario.tipo = this.tipoUsuario
   
    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas')
    } else {
      this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
    
        alert('Usuário atualizado com sucesso ❤!!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/inicio'])
      })
    }
  }


  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) =>{
      this.usuario= resp
    })
  }
}
