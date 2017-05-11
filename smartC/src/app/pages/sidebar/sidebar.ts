import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';
import { User } from '../../entity/user.entity';
import { StorageService } from '../../service/storage.service';


@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.html',
  providers: [StorageService]
})
export class SidebarComponent {
  user: User;
  constructor(
  	public router: Router,
    private storageService: StorageService) {
  	this.user = this.storageService.read<User>('user');
  // Push a search term into the observable stream.
  }
}
