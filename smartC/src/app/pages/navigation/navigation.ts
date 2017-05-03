import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../entity/user.entity';
import { StorageService } from '../../service/storage.service';


@Component({
  selector: 'sc-navigation',
  templateUrl: './navigation.html',
  providers: [StorageService]
})
export class navComponent implements OnInit {
  user: User;
  constructor(
    private storageService: StorageService) {}
  // Push a search term into the observable stream.
  
  ngOnInit(): void {

  }
  // gotoDetail(hero: Hero): void {
  //   let link = ['/detail', hero.id];
  //   this.router.navigate(link);
  // }
}
