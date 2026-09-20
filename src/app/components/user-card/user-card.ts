import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { Users } from '../../services/users';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';


@Component({
  imports: [RouterLink],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  myUser = input.required<IUser>();
  deleted = output<string>();
  usersService = inject(Users);

  async onDelete(_id: string | undefined) {
  if (!_id) return;

  const resultado = await Swal.fire({
    title: `Deseas Borrar al usuario ${this.myUser().first_name}`,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  });

  if (!resultado.isConfirmed) return;

  try {
    const respuesta = await this.usersService.deleteById(_id);
    if (respuesta._id || respuesta.id) {
      toast.success('Usuario borrado correctamente');
      this.deleted.emit(_id);
    } else {
      toast.error('No se ha podido borrar el usuario');
    }
  } catch (error) {
    toast.error('Ha ocurrido un error al borrar el usuario');
    console.log(error);
  }
}
}