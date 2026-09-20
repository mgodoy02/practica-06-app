import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';

@Component({
  imports: [RouterLink],
  selector: 'app-user-view',
  styleUrl: './user-view.css',
  templateUrl: './user-view.html',
})
export class UserView implements OnInit {
  _id = input.required<string>();
  usersService = inject(Users);
  router = inject(Router);
  user = signal<IUser | null>(null);
  cargando = signal(true);

  ngOnInit() {
    this.cargarUsuario();
  }

  async cargarUsuario() {
    this.cargando.set(true);
    try {
      const respuesta = await this.usersService.getById(this._id());
      this.user.set(respuesta);
    } catch (error) {
      toast.error('No se ha podido cargar el usuario');
      console.log(error);
    } finally {
      this.cargando.set(false);
    }
  }

  async onDelete() {
    const confirmado = confirm('¿Seguro que quieres borrar este usuario?');
    if (!confirmado) return;

    try {
      const respuesta = await this.usersService.deleteById(this._id());
      if (respuesta._id || respuesta.id) {
        toast.success('Usuario borrado correctamente');
        this.router.navigate(['/home']);
      } else {
        toast.error('No se ha podido borrar el usuario');
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al borrar el usuario');
      console.log(error);
    }
  }
}