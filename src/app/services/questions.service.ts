import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Question, ApiResponse } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly URL = environment.apiUrl;

  private readonly questionsSubject = new BehaviorSubject<Question[]>([]);
  readonly questions$ = this.questionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadQuestions() {
    this.getQuestions().subscribe({
      next: (response: ApiResponse) => {
        this.questionsSubject.next(response.results);
      },
      error: (e) => {
        console.error('Error fetching questions:', e.message);
      },
    });
  }

  private getQuestions(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.URL);
  }
}
