import { Song } from './song';

export class DiaryEntry {
  constructor(
    public id: string,
    public referenceDate: Date,
    public modificationDate: Date,
    public songs: Song[],
    public entry: string
  ) {}
}
