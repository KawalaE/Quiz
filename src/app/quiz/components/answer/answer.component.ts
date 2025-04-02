import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'quiz-answer',
  imports: [CommonModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css',
})
export class AnswerComponent {
  _quizService = inject(QuizService);

  answerText = input.required<string>();
  answerIndex = input.required<number>();

  isCorrectAnswer = computed(
    () =>
      !!this._quizService.currentAnswer() &&
      this.answerText() === this._quizService.currentQuestion().correctAnswer
  );

  isWrongAnswer = computed(
    () =>
      this.answerText() === this._quizService.currentAnswer() &&
      this._quizService.currentAnswer() !==
        this._quizService.currentQuestion().correctAnswer
  );
  letterMapping = ['A', 'B', 'C', 'D'];
}
