import { Song } from './song';

export class DiaryEntry {
  constructor(
    public id: string | null,
    public referenceDate: Date,
    public modificationDate: Date | null,
    public songs: Song[],
    public entry: string | null
  ) {}
}
