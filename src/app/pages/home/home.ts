import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserCard } from '../../components/user-card/user-card';
import { Users } from '../../services/users';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  imports: [RouterLink, UserCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  usersService = inject(Users);
  usersList = signal<IUser[]>([]);
  cargando = signal(true);
  error = signal(false);

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargando.set(true);
    this.error.set(false);
    try {
      const respuesta = await this.usersService.getUsers();
      this.usersList.set(respuesta.results);
    } catch (error) {
      this.error.set(true);
      console.log(error);
    } finally {
      this.cargando.set(false);
    }
  }

  onUserDeleted(_id: string) {
    this.usersList.update(lista => lista.filter(user => user._id !== _id));
  }
}