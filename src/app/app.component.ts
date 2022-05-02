import { Component } from '@angular/core';
import { AppService } from './servicios/app.service';
import { TokenService } from './servicios/token.service';
import { Router } from '@angular/router';
import { ChatAdapter } from 'ng-chat';
import { DemoAdapter } from './modelos/demo-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pro-dashboard-angular';
  isLogin = false;
  roles: string[];
  authority: string;

  public adapter: ChatAdapter = new DemoAdapter();

  constructor(private appService: AppService, 

              private tokenService: TokenService, 
              private router: Router) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMINISTRADOR') {
          this.authority = 'administrador';
          return true;
        }
        if (rol === 'ROLE_COORDINADOR') {
          this.authority = 'coordinador';
          return true;
        }
        if (rol === 'ROLE_SECTOR') {
          this.authority = 'sector';
          return true;
        }
        if (rol === 'ROLE_OPERADOR') {
          this.authority = 'operador';
          return true;
        }
      });
    }
  }

  public messageSeen(event: any)
  {
    console.log(event);
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
