import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iscob-ng';

  constructor(private oauthService: OAuthService){
	  this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/iscob',
    redirectUri: window.location.origin,
    clientId: 'iscob-frontend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void{
	this.oauthService.configure(this.authConfig);
	this.oauthService.tokenValidationHandler = new NullValidationHandler();
	this.oauthService.setupAutomaticSilentRefresh();
	this.oauthService.loadDiscoveryDocument().then(()=> this.oauthService.tryLogin());
  }

  login():void {
	this.oauthService.initImplicitFlowInternal();
  }

  logout():void {
	this.oauthService.logOut()
  }

}
