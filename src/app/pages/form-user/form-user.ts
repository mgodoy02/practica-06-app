import { Component, inject, input, OnInit, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Users } from '../../services/users';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';

@Component({
  imports: [FormField],
  selector: 'app-form-user',
  styleUrl: './form-user.css',
  templateUrl: './form-user.html',
})
export class FormUser implements OnInit {
  _id = input<string>();
  title = signal('Nuevo usuario');
  usersService = inject(Users);
  router = inject(Router);

  userModel = signal<IUser>({
    first_name: '',
    last_name: '',
    email: '',
    image: '',
  });

  readonly userForm = form(this.userModel, (schemaPath) => {
    required(schemaPath.first_name, { message: 'El nombre es obligatorio' });
    required(schemaPath.last_name, { message: 'El apellido es obligatorio' });
    required(schemaPath.email, { message: 'El email es obligatorio' });
    email(schemaPath.email, { message: 'El email no tiene un formato válido' });
    required(schemaPath.image, { message: 'La imagen es obligatoria' });
  });

  async ngOnInit() {
    const id = this._id();
    if (id) {
      this.title.set('Actualizar usuario');
      try {
        const usuarioActual = await this.usersService.getById(id);
        this.userModel.set(usuarioActual);
      } catch (error) {
        toast.error('No se ha podido cargar el usuario a actualizar');
        console.log(error);
      }
    }
  }

  async guardar(event: Event) {
    event.preventDefault();

    if (this.userForm().invalid()) {
      toast.error('Revisa los campos del formulario');
      return;
    }

    const id = this._id();
    try {
      if (id) {
        const respuesta = await this.usersService.register(this.userForm().value());
        (respuesta._id || respuesta.id)
          ? toast.success(`Usuario ${respuesta.first_name} creado correctamente`)
          : toast.error('No se ha podido crear el usuario');
      } else {
        const respuesta = await this.usersService.register(this.userForm().value());
        (respuesta._id || respuesta.id)
          ? toast.success(`Usuario ${respuesta.first_name} creado correctamente`)
          : toast.error('No se ha podido crear el usuario');
      }
      this.router.navigate(['/home']);
    } catch (error) {
      toast.error('Ha ocurrido un error al guardar el usuario');
      console.log(error);
    }
  }
}