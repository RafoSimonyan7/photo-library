import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoService } from 'src/app/services/photo.service';
import { FavoritesComponent } from './favorites.component';
import { favoritesMock } from 'src/app/test/test.data';
import { IPhoto } from 'src/app/interfaces/photo.interface';

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

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatGridListStubComponent, MatGridTileStubComponent, PhotoCardStubComponent],
      providers: [{
        provide: PhotoService,
        useValue: {
          getFavorites: () => favoritesMock
        }
      }],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
