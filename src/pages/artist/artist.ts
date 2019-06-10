import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IArtist } from '../Interfaces/IArtist';
import { ArtistApiProvider } from '../../providers/artist-api';


export interface IArtist{

}

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})

export class ArtistPage {
  artists=[];
  search;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public artistApiProvider: ArtistApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistPage');
  }

  filtre(theSearch: string) {
    if(theSearch != ""){
      this.search = theSearch;
      let res = this.artistApiProvider.searchArtist(this.search);
      console.log(res)
      res.subscribe(
        data =>{
          this.artists = data.results;
        },
        error =>{
          console.log(error);
        }
      )
    }
  }

 /* doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.artistApiProvider.searchArtist(this.search).subscribe((data => {
        let newlist = data.results;
        newlist.forEach((artist)=>{
          this.artists.push(artist);
        });
      }));
      infiniteScroll.complete();
    }, 500);
  }*/
}
