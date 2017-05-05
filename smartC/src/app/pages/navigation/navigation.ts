import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../entity/user.entity';
import { StorageService } from '../../service/storage.service';


@Component({
  selector: 'nav-component',
  templateUrl: './navigation.html',
  providers: [StorageService]
})
export class NavComponent{
  user: User;

  constructor(
    private storageService: StorageService) {
    this.user = this.storageService.read<User>('user');
  }
    
  // Push a search term into the observable stream.
  // gotoDetail(hero: Hero): void {
  //   let link = ['/detail', hero.id];
  //   this.router.navigate(link);
  // }
}
