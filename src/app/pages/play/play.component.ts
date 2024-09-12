import { Question, QuestionFormValue } from './../../models/question.model';
import { Component, OnInit } from '@angular/core';
import { Quiz, QuizResult } from '../../models/quiz.model';
import { Router } from '@angular/router';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-play',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TimeFormatPipe],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  quiz: Quiz;
  elapsedTime: number = 0;
  private timer: any;
  quizForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.quiz = this.router.getCurrentNavigation()?.extras.state?.['quiz'];
  }

  ngOnInit(): void {
    if (!this.quiz) {
      this.router.navigate(['/']);
    }

    this.startTimer();
    this.initializeForm();
  }

  private initializeForm(): void {
    const questionControls = this.quiz.questions.map((q: Question) => {
      const allOptions = [q.correct_answer, ...q.incorrect_answers];
      const shuffledOptions = this.shuffleArray(allOptions);

      return this.fb.group({
        questionText: [q.question],
        selectedOption: ['', Validators.required],
        options: [shuffledOptions],
      });
    });

    this.quizForm = this.fb.group({
      questions: this.fb.array(questionControls),
    });
  }

  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  get questionsArray(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      this.elapsedTime++;
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this.timer);
  }

  onSubmit(): void {
    this.stopTimer();
    const answers: string[] = this.quizForm.value.questions.map(
      (a: QuestionFormValue) => a.selectedOption
    );

    const correctAnswers = this.countCorrectAnswers(answers);
    const points = (correctAnswers / answers.length) * 100;

    const quizResult: QuizResult = {
      score: points,
      correctAnswers: correctAnswers,
      totalQuestions: answers.length,
      timeTaken: this.elapsedTime,
    };
    this.router.navigate(['/finish'], { state: { quizResult } });
  }

  private countCorrectAnswers(answers: string[]): number {
    const correctAnswers = this.quiz.questions.reduce((acc, q, index) => {
      if (q.correct_answer === answers[index]) {
        acc++;
      }
      return acc;
    }, 0);
    return correctAnswers;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
