import { Component } from '@angular/core';
import { QuestionComponent } from './components/question/question.component';

@Component({
  standalone: true,
  selector: 'quiz',
  imports: [QuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {}
