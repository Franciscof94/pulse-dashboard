export interface Release {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverArt: string;
  streams: number;
  revenue: number;
  type: 'single' | 'album' | 'ep';
}
