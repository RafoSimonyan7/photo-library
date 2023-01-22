import { Injectable } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public addFavorite(key: string, data: IPhoto[] ): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFavorites(key: string): string | null {
    return localStorage.getItem(key)
  }
}
