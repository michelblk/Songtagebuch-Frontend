export class Song {
  constructor(
    public id: string|null = null,
    public interpret: string|null = null,
    public name: string|null = null,
    public album: string|null = null,
    public spotifyId: string|null = null,
    public coverUrl: string|null = null,
    public previewUrl: string|null = null
  ) {}
}
