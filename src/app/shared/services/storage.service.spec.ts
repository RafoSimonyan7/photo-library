import { TestBed } from '@angular/core/testing';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { favoritesMock } from 'src/app/test/test.data';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const key: string = 'favorites';
  const data: IPhoto[] = favoritesMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to favorite', () => {
    service.addFavorite(key, data);
    expect(localStorage.length).toBe(2)
  });

  it('should retur favorites', () => {
    const localStorageSpy = spyOn(localStorage, 'getItem')
    service.getFavorites(key);
    expect(localStorageSpy).toHaveBeenCalledWith(key)
  });
});
