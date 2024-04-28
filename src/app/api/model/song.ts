export class Song {
  constructor(
    public id: string,
    public interpret: string,
    public name: string,
    public album: string,
    public spotifyId: string,
    public coverUrl: string,
    public previewUrl: string
  ) {}
}
