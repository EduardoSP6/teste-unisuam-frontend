import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroEnvelope,
  heroLink,
  heroUsers,
  heroBuildingOffice2,
  heroMapPin,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, NgIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
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
export class ProfileComponent {
  @Input() userProfile!: User;
}
