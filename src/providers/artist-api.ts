import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ArtistApiProvider {
  private UrlSearchArtist = 'https://api.musixmatch.com/ws/1.1/artist.search?'


  private httpOptions = {
    headers : new HttpHeaders({
      "content-type": "application/js",
      "Access-Control-Allow-Origin": "http://localhost:8100",
    }),
    params:{
      "apikey" : "e46c26542d3e03831d000e3866d46b34",
      "page_size" : "5",
      "q_artist" : "",
    }
  }

  constructor(public http: HttpClient) {
    console.log('Hello musixmatch Provider');
  }
  
  public searchArtist(searchStr):Observable<any>{
    this.httpOptions.params.q_artist = searchStr 
    return this.http.get(this.UrlSearchArtist,this.httpOptions); 
  }
}
