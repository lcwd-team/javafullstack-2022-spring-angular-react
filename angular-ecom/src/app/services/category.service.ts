import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {

  }

  loadCategories() {
    return this.http.get(`${environment.baseUrl}/categories/`)
  }

  //category create


}
