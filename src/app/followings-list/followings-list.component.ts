import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FollowingUser } from '../models/following-user.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingOffice2, heroMapPin } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-followings-list',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './followings-list.component.html',
  styleUrl: './followings-list.component.css',
  viewProviders: [
    provideIcons({
      heroBuildingOffice2,
      heroMapPin,
    }),
  ],
})
export class FollowingsListComponent {
  @Input() followings: FollowingUser[] = [];
}
