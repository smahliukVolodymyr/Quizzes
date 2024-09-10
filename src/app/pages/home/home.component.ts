import { HttpClientModule } from '@angular/common/http';
import { Question } from '../../models/question.model';
import { QuestionsService } from './../../services/questions.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  providers: [QuestionsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private questions: Question[] = [];

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService.questions$.subscribe((questions: Question[]) => {
      this.questions = questions;
    });
    this.questionsService.loadQuestions();
  }
}
