import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: any;
  repositories: any;
  followers: any;

  constructor(
    private router: Router,
    private github: GithubService,
    private userService: UserService
    // private route: ActivatedRoute
  ) {
    // this.route.queryParams
    // .subscribe(params => {
    //     console.log(JSON.parse(params.user));
    // });
  }

  ngOnInit() {

    this.userService.obtenerUsuario()
    .subscribe( res => {
      if (res) {
        this.user = res;
      } else {
        this.volver();
      }
    });

    this.github.getRepositorios(this.user.repos_url)
    .subscribe( res => {
      this.repositories = res;
    });
    this.github.getSeguidores(this.user.followers_url)
    .subscribe( res => {
      this.followers = res;
    });
  }

  ngOnDestroy(){
    if (this.user){
      this.userService.completarUsuario();
    }
  }

  volver(){
    this.router.navigate(['lista']);
  }
}
