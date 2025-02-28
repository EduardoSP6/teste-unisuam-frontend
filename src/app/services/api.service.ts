import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { FollowingUser } from '../models/following-user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl + '/api/github-users';

  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  getUserFollowings(username: string): Observable<FollowingUser[]> {
    return this.http.get<FollowingUser[]>(
      `${this.apiUrl}/${username}/followings`
    );
  }
}
