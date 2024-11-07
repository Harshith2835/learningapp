import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parsedLectureContent from '../data/parsedLectureContent.json';
import '../styles/lecture.css';
import Card from '../components/Card';
import Quiz from '../components/Quiz';

export default function Lecture() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecture = parsedLectureContent.lectures[id - 1];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [viewedCards, setViewedCards] = useState(() => {
    const savedViewedCards = JSON.parse(localStorage.getItem(`viewedCards-${id}`));
    return savedViewedCards || Array(lecture.cards.length).fill(false);
  });
  const [unlockedCards, setUnlockedCards] = useState(() => {
    const savedUnlockedCards = JSON.parse(localStorage.getItem(`unlockedCards-${id}`));
    return savedUnlockedCards || [0];
  });
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    const allViewed = viewedCards.every(viewed => viewed);
    const allWordsCorrect = viewedCards.every((viewed, index) => {
      const card = lecture.cards[index];
      const savedAnswers = JSON.parse(localStorage.getItem(`answers-${card.sentence.join(' ')}`)) || [];
      return savedAnswers.every((answer, i) => answer.toLowerCase() === card.words[i].toLowerCase());
    });
    setAllCorrect(allViewed && allWordsCorrect);
  }, [viewedCards, lecture.cards]);

  useEffect(() => {
    localStorage.setItem(`viewedCards-${id}`, JSON.stringify(viewedCards));
  }, [viewedCards, id]);

  useEffect(() => {
    localStorage.setItem(`unlockedCards-${id}`, JSON.stringify(unlockedCards));
  }, [unlockedCards, id]);

  const handleNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % lecture.cards.length;
    if (unlockedCards.includes(nextIndex) || currentCardIndex === lecture.cards.length - 1) {
      setCurrentCardIndex(nextIndex);
      const newViewedCards = [...viewedCards];
      newViewedCards[nextIndex] = true;
      setViewedCards(newViewedCards);
    }
  };

  const handlePrevCard = () => {
    const prevIndex = (currentCardIndex - 1 + lecture.cards.length) % lecture.cards.length;
    if (currentCardIndex === 0 && !unlockedCards.includes(lecture.cards.length - 1)) {
      return;
    }
    setCurrentCardIndex(prevIndex);
  };

  const handleCardCompletion = (index) => {
    if (!unlockedCards.includes(index + 1) && index < lecture.cards.length - 1) {
      setUnlockedCards([...unlockedCards, index + 1]);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleReviewCards = () => {
    setCurrentCardIndex(0);
    setShowQuiz(false);
  };

  const completedCards = viewedCards.filter(viewed => viewed).length;
  const progress = (completedCards / lecture.cards.length) * 100;

  return (
    <>
      <h3 className="lecture-title">{lecture.title.split(':')[0]}</h3>
      {!showQuiz ? (
        <div className="lecture-content">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <Card
            card={lecture.cards[currentCardIndex]}
            nextCard={handleNextCard}
            prevCard={handlePrevCard}
            onCardCompletion={() => handleCardCompletion(currentCardIndex)}
            currentCardIndex={currentCardIndex}
            unlockedCards={unlockedCards}
            totalCards={lecture.cards.length}
          />
          <button
            className="start-quiz-button"
            onClick={handleStartQuiz}
            disabled={!allCorrect}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz quiz={lecture.quiz} lectureId={id} handleReviewCards={handleReviewCards} />
      )}
    </>
  );
}