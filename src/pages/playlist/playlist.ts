import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import SpotifyWebApi from 'spotify-web-api-js';

 
@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  tracks = [];
  playlistInfo = null;
  playing = false;
  spotifyApi: any;
  loading: Loading;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    let playlist = this.navParams.get('playlist');
    this.spotifyApi = new SpotifyWebApi();
 
    this.loadPlaylistData(playlist);
  }
 
  loadPlaylistData(playlist) {
    this.loading = this.loadingCtrl.create({
      content: "Loading Tracks...",
    });
    this.loading.present();
 
    this.spotifyApi.getPlaylist(playlist.owner.id, playlist.id).then(data => {
      this.playlistInfo = data;
      this.tracks = data.tracks.items;
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }
 

 
  playActiveDevice(item) {
    this.spotifyApi.play({ uris: [item.track.uri] });
  }
 

  open(item) {
    window.open(item.track.external_urls.spotify, '_system', 'location=yes');
  }
 
}