export interface IArtist{
    Imovie: Array<IArtist>
}

export interface IArtist{

  artist_id: number;
  artist_name: string;
  artist_name_translation_list: string[];
  artist_comment: string;
  artist_country: string;
  artist_alias_list: string[];
  artist_rating: number;
  artist_twitter_url: string;
  artist_credits: {
    artist_list: string[];
  },
}
