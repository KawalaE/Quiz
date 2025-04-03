import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackendQuestionInterface } from '../types/backendQuestion.interface';
import { QuestionInterface } from './../types/quesition.interface';

@Injectable({ providedIn: 'root' })
export class QuizService {
  http = inject(HttpClient);
  questions = signal<QuestionInterface[]>([]);
  currentQuestionIndex = signal<number>(0);
  error = signal<string | null>(null);

  currentAnswer = signal<string | null>(null);
  correctAnswersCount = signal<number>(0);

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
    //reset current question
    this.currentAnswer.set(null);
  }

  selectAnswer(answerText: string): void {
    this.currentAnswer.set(answerText);
    const correctAnswersCount =
      answerText === this.currentQuestion().correctAnswer
        ? this.correctAnswersCount() + 1
        : this.correctAnswersCount();

    this.correctAnswersCount.set(correctAnswersCount);
  }

  restartQuestions(): void {
    this.currentQuestionIndex.set(0);
    this.correctAnswersCount.set(0);
  }

  shuffleAnswers(question: QuestionInterface): string[] {
    const unshuffledAnswers = [
      this.currentQuestion().correctAnswer,
      ...this.currentQuestion().incorrectAnswers,
    ];
    return unshuffledAnswers
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  currentQuestionAnswers = computed(() => {
    return this.shuffleAnswers(this.currentQuestion());
  });

  getQuestions(): Observable<QuestionInterface[]> {
    const apiUrl =
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';
    return this.http.get<{ results: BackendQuestionInterface[] }>(apiUrl).pipe(
      map((response) => {
        return this.normalizeQuestions(response.results);
      })
    );
  }

  normalizeQuestions(
    backendQuestion: BackendQuestionInterface[]
  ): QuestionInterface[] {
    return backendQuestion.map((backendQuestion) => {
      const incorrectAnswers = backendQuestion.incorrect_answers.map(
        (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
      );
      return {
        question: decodeURIComponent(backendQuestion.question),
        correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
        incorrectAnswers,
      };
    });
  }
}
