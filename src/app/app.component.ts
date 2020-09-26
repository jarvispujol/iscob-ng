import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iscob-ng';

  admin: boolean;
  logged: boolean;

  constructor(private oauthService: OAuthService, private loginService: LoginService){
	  this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'https://jpdv-sso.herokuapp.com/auth/realms/iscob',
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
	this.oauthService.loadDiscoveryDocument().then(()=> this.oauthService.tryLogin())
	.then(() => {
		if(this.oauthService.getIdentityClaims()){
			this.logged = this.isLogged();
			this.admin = this.isAdmin();
		}
	})
  }

  public isLogged(): boolean{
	return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public isAdmin(): boolean{
	const token = this.oauthService.getAccessToken();
	const payload = token.split('.')[1];
	const payloadDecodeJson = atob(payload);
	const payloadDecode = JSON.parse(payloadDecodeJson);
	console.log(payloadDecode.realm_access.roles.indexOf("realm-admin"));
	return (payloadDecode.realm_access.roles.indexOf("realm-admin") !== -1 );
  }

  public login():void{
	  this.loginService.login();
  }

  public logout():void{
	this.loginService.logout();
}
}
