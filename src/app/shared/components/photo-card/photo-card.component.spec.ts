import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { photosMock } from 'src/app/test/test.data';
import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoCardComponent ],
      providers: [ Router ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    component.photo = photosMock[0];
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when selecting photo', () => {
    describe('when isFavorite is false', () => {
      it('should emit photo', () => {
        const emitPhotoSpy = spyOn(component.selectPhoto, 'emit')
        component.isFavorite = false;
        component.onSelectPhoto(photosMock[0])

        expect(emitPhotoSpy).toHaveBeenCalledWith(photosMock[0])
      });
    });

    describe('when isFavorite is true', () => {
      it('should navigate single photo page', () => {
        const navigateSpy = spyOn(router, 'navigate')
        component.isFavorite = true;
        component.onSelectPhoto(photosMock[0])

        expect(navigateSpy).toHaveBeenCalledWith([`/photos/${photosMock[0].id}`])
      })
    })
  })
});
