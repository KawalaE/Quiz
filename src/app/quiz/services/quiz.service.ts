import { computed, Injectable, signal } from '@angular/core';
import { QuestionInterface } from './../types/quesition.interface';

@Injectable({ providedIn: 'root' })
export class QuizService {
  questions = signal<QuestionInterface[]>(this.getMockQuestions());
  currentQuestionIndex = signal<number>(0);
  currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()]
  );
  showResults = computed(() => {
    return this.currentQuestionIndex() === this.questions().length;
  });

  goToNextQuestion(): void {
    const currentQuestionIndex = this.showResults()
      ? this.currentQuestionIndex()
      : this.currentQuestionIndex() + 1;
    this.currentQuestionIndex.set(currentQuestionIndex);
  }

  getMockQuestions(): QuestionInterface[] {
    return [
      {
        question: 'What CSS stands for?',
        incorrectAnswers: [
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets',
        ],
        correctAnswer: 'Cascading Style Sheets',
      },
      {
        question:
          'Where in HTML document it the correct place to referr to style sheets',
        incorrectAnswers: [
          'In the <body> section',
          'At the end of the document',
          "You can't refer to an external style sheet",
        ],
        correctAnswer: 'In the <head> section',
      },
    ];
  }
}
