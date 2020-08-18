import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  uid;
  user$;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.uid = this.activatedRoute.paramMap.subscribe(params => {
      this.uid = params.get('id');
      console.log('this.uid', this.uid);
      this.user$ = this.userService.getUser(this.uid)
    })
  }

}
