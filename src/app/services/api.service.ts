import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { FollowingUser } from '../models/following-user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl + '/api/github-users';

  constructor(private http: HttpClient) {}

  /**
   * Envia requisição para obter dados do perfil.
   * @param username
   * @returns
   */
  getUserProfile(username: string): Observable<User | null> {
    return this.http.get<User | null>(`${this.apiUrl}/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error(`Perfil não encontrado: ${username}`);
          return of(null); // Retorna null quando o usuário não for encontrado
        } else {
          console.error(`Erro na API:`, error);
          return of(null); // Retorna null para qualquer outro erro
        }
      })
    );
  }

  /**
   * Envia requisição para obter lista de usuarios seguidos.
   * @param username
   * @returns
   */
  getUserFollowings(username: string): Observable<FollowingUser[]> {
    return this.http
      .get<FollowingUser[]>(`${this.apiUrl}/${username}/followings`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(`Erro ao buscar seguidores:`, error);
          return of([]); // Retorna uma lista vazia em caso de erro
        })
      );
  }
}
