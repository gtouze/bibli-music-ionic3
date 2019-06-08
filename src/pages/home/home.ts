import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, Loading } from 'ionic-angular';
import SpotifyWebApi from 'spotify-web-api-js';
import { Storage } from '@ionic/storage';
 
declare var cordova: any;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result = {};
  data = '';
  playlists = [];
  spotifyApi: any;
  loggedIn = false;
  loading: Loading;


  constructor(public navCtrl: NavController, private storage: Storage, private plt: Platform, private loadingCtrl: LoadingController) {
    this.spotifyApi = new SpotifyWebApi();
 
    this.plt.ready().then(() => {
      this.storage.get('logged_in').then(res => {
        if (res) {
          this.authWithSpotify(true);
        }
      });
    });
  }
 
  authWithSpotify(showLoading = false) {
    const config = {
      clientId: "173c8b2ee7b04277970f71108a9b368e",
      redirectUrl: "http://bibli-music/callback/",
      scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"],
      tokenExchangeUrl: "oauth-token-api-dev-exchangeCode",
      tokenRefreshUrl: "oauth-token-api-dev-refreshToken",
    };

    if (showLoading) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
 
    cordova.plugins.spotifyAuth.authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        if (this.loading) {
          this.loading.dismiss();
        }
 
        this.result = { access_token: accessToken, expires_in: expiresAt, refresh_token: encryptedRefreshToken };
        this.loggedIn = true;
        this.spotifyApi.setAccessToken(accessToken);
        this.getUserPlaylists();
        this.storage.set('logged_in', true);
      }, err => {
        console.error(err);
        if (this.loading) {
          this.loading.dismiss();
        }
      });
  }
 
  getUserPlaylists() {
    this.loading = this.loadingCtrl.create({
      content: "Loading Playlists...",
    });
    this.loading.present();
 
    this.spotifyApi.getUserPlaylists()
      .then(data => {
        if (this.loading) {
          this.loading.dismiss();
        }
        this.playlists = data.items;
      }, err => {
        console.error(err);
        if (this.loading) {
          this.loading.dismiss();
        }
      });
  }
 
  openPlaylist(item) {
    this.navCtrl.push('PlaylistPage', { playlist: item });
  }
 
  logout() {
    // Should be a promise but isn't
    cordova.plugins.spotifyAuth.forget();
 
    this.loggedIn = false;
    this.playlists = [];
    this.storage.set('logged_in', false);
  }
}