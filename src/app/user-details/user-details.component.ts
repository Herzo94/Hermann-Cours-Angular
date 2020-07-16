import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
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
