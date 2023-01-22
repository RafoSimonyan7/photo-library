import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { favoritesMock, photosMock } from 'src/app/test/test.data';
import { SinglePhotoComponent } from './single-photo.component';

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            addFavorite: (): void => {}
          }
        },
        {
          provide: ActivatedRoute, 
          useValue: {
            paramMap: of({ get: (): string => '0' })
          }
        }, 
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: PhotoService, 
          useValue: {
            getFavorites: (): IPhoto[] => favoritesMock,
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when called ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should be defined favorites', () => {
      expect(component.favorites).toEqual(favoritesMock)
    });

    it('should be defined single photo', () => {
      expect(component.singlePhoto).toEqual(favoritesMock[0])
    });
  })

  describe('when removing from favorites', () => {
    it('should add new favorites array', () => {
      const addFavoriteSpy = spyOn(storageService, 'addFavorite')
      component.removePhotoFromFavorites(favoritesMock[0].id);
      expect(addFavoriteSpy).toHaveBeenCalled();
    })
  })
});
