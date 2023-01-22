import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { StorageService } from '../shared/services/storage.service';
import { favoritesMock } from '../test/test.data';

import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let storageService: StorageService;
	let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: StorageService,
          useValue: {getFavorites: () => favoritesMock}
        },
      ],
    });
    service = TestBed.inject(PhotoService);
		http = TestBed.inject(HttpClient);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>; 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of photos', fakeAsync((done: DoneFn) => {
    const page: number = 1;
    const limit: number = 12;
    const httpGetMethodSpy = spyOn(http, 'get').and.callThrough();
    service.getList(page, limit);

    expect(httpGetMethodSpy).toHaveBeenCalledWith(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    
  }));

  it('should get favorites list from localStorage', () => {
    const jsonParseSpy = spyOn(JSON, 'parse');
    service.getFavorites();
    expect(jsonParseSpy).toHaveBeenCalled();
  })
});
