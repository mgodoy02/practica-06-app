import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IUser, UsersResponse } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Service()
export class Users {
  private baseUrl = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getUsers() {
    return firstValueFrom(this.httpClient.get<UsersResponse>(`${this.baseUrl}?per_page=50`));
  }

  getById(_id: string) {
    return firstValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`));
  }

  register(user: IUser) {
    return firstValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
  }

  update(_id: string, user: IUser) {
    const { _id: idAntiguo, id, ...resto } = user;
    return firstValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${_id}`, resto));
  }

  deleteById(_id: string) {
    return firstValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`));
  }
}