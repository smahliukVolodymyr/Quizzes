import { HttpClientModule } from '@angular/common/http';
import { Question } from '../../models/question.model';
import { QuestionsService } from './../../services/questions.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz } from '../../models/quiz.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [QuestionsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionsService.questions$.subscribe((questions: Question[]) => {
      this.quizzes = this.createQuizzes(questions);
    });
    this.questionsService.loadQuestions();
  }

  private createQuizzes(questions: Question[]): Quiz[] {
    const quizMap: { [key: string]: Quiz } = {};

    questions.forEach((question) => {
      if (!quizMap[question.category]) {
        quizMap[question.category] = {
          category: question.category,
          questions: [],
        };
      }

      quizMap[question.category].questions.push(question);
    });

    return Object.values(quizMap);
  }

  playQuiz(quiz: Quiz): void {
    this.router.navigate(['/play'], { state: { quiz } });
  }

  selectRandomQuiz(): void {
    const randomQuizIndex = Math.floor(Math.random() * this.quizzes.length);
    this.playQuiz(this.quizzes[randomQuizIndex]);
  }
}
