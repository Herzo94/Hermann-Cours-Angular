import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  constructor(private afs: UserService) { }

  ngOnInit(): void {
    this.users$ = this.afs.getUsers();
  }

}
