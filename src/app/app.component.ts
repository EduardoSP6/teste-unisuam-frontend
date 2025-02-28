import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { FollowingUser } from './models/following-user.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import {
  heroEnvelope,
  heroLink,
  heroUsers,
  heroBuildingOffice2,
  heroMapPin,
} from '@ng-icons/heroicons/outline';
import { LoadingComponent } from './loading-component/loading-component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CommonModule, FormsModule, NgIcon, LoadingComponent],
  viewProviders: [
    provideIcons({
      heroEnvelope,
      heroLink,
      heroUsers,
      heroBuildingOffice2,
      heroMapPin,
    }),
  ],
})
export class AppComponent implements OnInit {
  @Input() username!: string;

  userProfile: User | null = null;
  followings: FollowingUser[] = [];
  originalFollowings: FollowingUser[] = [];
  searchQuery: string = '';
  isLoadingFollowings: boolean = false;
  isLoadingProfile: boolean = false;
  errorMessage: string = '';

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'] ?? '';
      if (this.username.length > 0) {
        this.loadUserProfile();
        this.loadUserFollowings();
      }
    });
  }

  /**
   * Obtem dados do perfil
   */
  loadUserProfile() {
    this.userProfile = null;
    this.errorMessage = '';
    try {
      this.isLoadingFollowings = true;
      this.apiService.getUserProfile(this.username).subscribe((user) => {
        if (user) {
          this.userProfile = user;
        } else {
          this.errorMessage =
            'Perfil não encontrado. Verifique o username digitado.';
        }
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.error('Erro ao buscar o perfil: ', error);
      this.errorMessage =
        'Ocorreu um erro ao buscar o perfil. Tente novamente mais tarde.';
    }
  }

  /**
   * Obtem coleção de usuarios seguidos.
   */
  loadUserFollowings() {
    try {
      this.isLoadingFollowings = true;
      this.apiService.getUserFollowings(this.username).subscribe((data) => {
        this.followings = data;
        this.originalFollowings = data;
        this.isLoadingFollowings = false;
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.error(
        `Erro ao buscar usuários seguidos do ${this.username}: `,
        error
      );
    }
  }

  /**
   * Filtro de usuarios seguidos.
   * @returns
   */
  filterFollowings(): void {
    const query = this.searchQuery.toLowerCase();

    if (query.length === 0) {
      this.followings = this.originalFollowings;
      this.cdr.detectChanges();
      return;
    }

    const filtereds = this.followings.filter((following) =>
      following.username.toLowerCase().includes(query)
    );

    if (filtereds.length > 0) {
      this.followings = filtereds;
      this.cdr.detectChanges();
    }
  }
}
