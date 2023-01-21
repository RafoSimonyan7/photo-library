import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable } from 'rxjs';
import { IPhoto } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public loading$: Observable<boolean>;
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loading$ = this.loading.asObservable();
  }

  getList(page: number, limit: number): Observable<IPhoto[]> {
    this.loading.next(true);
    return this.http.get<IPhoto[]>(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`).pipe(
      delay(300),
      finalize(() => this.loading.next(false))
    )
  }
}
