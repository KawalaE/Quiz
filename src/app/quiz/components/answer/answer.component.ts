import { Component, input } from '@angular/core';

@Component({
  selector: 'quiz-answer',
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css',
})
export class AnswerComponent {
  answerText = input.required<string>();
  answerIndex = input.required<number>();

  letterMapping = ['A', 'B', 'C', 'D'];
}
