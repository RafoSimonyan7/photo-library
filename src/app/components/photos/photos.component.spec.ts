import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { favoritesMock, photosMock } from 'src/app/test/test.data';
import { PhotosComponent } from './photos.component';

@Component({ selector: 'mat-grid-list', template: '' })
export class MatGridListStubComponent {
  @Input() public gutterSize!: string
}

@Component({ selector: 'mat-grid-tile', template: '' })
export class MatGridTileStubComponent { }

@Component({ selector: 'app-photo-card', template: '' })
export class PhotoCardStubComponent { 
  @Input() public photo!: IPhoto;
  @Input() public isFavorite: boolean = false;
  @Output() public selectPhoto: EventEmitter<IPhoto> = new EventEmitter<IPhoto>();
}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let storageService: StorageService;
  let photos$: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>(photosMock)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent, MatGridListStubComponent, MatGridTileStubComponent, PhotoCardStubComponent ],
      providers: [
        {
          provide: PhotoService,
          useValue: {
            getFavorites: (): IPhoto[] => favoritesMock,
            getList: (): Observable<IPhoto[]> => photos$.asObservable(),
          }
        },
        {
          provide: StorageService,
          useValue: {
            addFavorite: (): void => {}
          }
        } 
    ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>; 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when scrolling list', () => {
    it('should load new data', () => {
      window.dispatchEvent(new Event('scroll'))
      expect(component.photos.length).toBe(photosMock.length * 2)
    })
  })

  describe('when adding favorite photo', () => {
    it('should add new photo in favorites', () => {
      component.addToFavorite(photosMock[2]);
      spyOn(storageService, 'addFavorite')

      expect(component.photos[2].favorite).toBeTrue();
    })
  })
});
