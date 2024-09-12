import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizResult } from '../../models/quiz.model';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [TimeFormatPipe],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent {
  quizResult: QuizResult;
  correctAnswersStats: string = '';

  constructor(private router: Router) {
    this.quizResult =
      this.router.getCurrentNavigation()?.extras.state?.['quizResult'];
  }
  ngOnInit(): void {
    if (!this.quizResult) {
      this.router.navigate(['/']);
    }
    this.correctAnswersStats = `${this.quizResult.correctAnswers}/${this.quizResult.totalQuestions}`;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
