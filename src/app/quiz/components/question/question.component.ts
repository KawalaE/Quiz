import { Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'quiz-question',
  imports: [AnswerComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  _quizService = inject(QuizService);
  currentQuestion =
    this._quizService.questions()[this._quizService.currentQuestionIndex()]
      .question;
}
