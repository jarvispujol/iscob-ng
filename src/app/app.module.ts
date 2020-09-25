import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	OAuthModule.forRoot({
		resourceServer: {
			allowedUrls: ['http://localhost:8081/test'],
			sendAccessToken: true
		}
	})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
