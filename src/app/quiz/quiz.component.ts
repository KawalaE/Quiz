import { Component, inject } from '@angular/core';
import { QuestionComponent } from './components/question/question.component';
import { QuizService } from './services/quiz.service';

@Component({
  standalone: true,
  selector: 'quiz',
  imports: [QuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  _quizService = inject(QuizService);

  ngOnInit(): void {
    this._quizService.getQuestions().subscribe({
      next: (questions) => {
        this._quizService.questions.set(questions);
      },
      error: (err) => {
        console.log('err', err.message);
        this._quizService.error.set(err.message);
      },
    });
  }
}
