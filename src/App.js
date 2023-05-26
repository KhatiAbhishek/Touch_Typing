import React, { useState, useEffect } from 'react';
import './App.css'
const TouchTypingExercise = () => {
  const [keys, setKeys] = useState(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
  const [currentKey, setCurrentKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [typingBoxVisible, setTypingBoxVisible] = useState(false);

  useEffect(() => {
    startExercise();
  }, []);

  const startExercise = () => {
    setCurrentKey(getRandomKey());
    setInputValue('');
    setCorrectCount(0);
    setTotalCount(0);
    setStartTime(Date.now());
    setEndTime(0);
    setTypingBoxVisible(true);
  };

  const getRandomKey = () => {
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  const handleInputChange = (e) => {
    const typedValue = e.target.value;
    setInputValue(typedValue);
    checkTypingAccuracy(typedValue);
  };

  const checkTypingAccuracy = (typedValue) => {
    const expectedValue = currentKey;
    if (typedValue === expectedValue) {
      setCorrectCount(correctCount + 1);
    }
    setTotalCount(totalCount + 1);
    setCurrentKey(getRandomKey());
  };

  const endExercise = () => {
    setEndTime(Date.now());
    setTypingBoxVisible(false);
  };

  const calculateTypingSpeed = () => {
    const timeInSeconds = (endTime - startTime) / 1000;
    const typingSpeed = Math.round((totalCount / timeInSeconds) * 60);
    return typingSpeed || 0;
  };

  const calculateAccuracy = () => {
    const accuracy = Math.round((correctCount / totalCount) * 100);
    return accuracy || 0;
  };

  const renderTypingBox = () => {
    if (typingBoxVisible) {
      return (
        <div className='typing-box'>
          <p className='para'>Type the following keys:</p>
          <p className='key-display' >{currentKey}</p>
          <input className='input-field' type="text" value={inputValue} onChange={handleInputChange} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="exercise-container">
      <h1>Touch Typing Exercise</h1>
      {renderTypingBox()}
      {endTime > 0 && (
        <div>
          <p className='result'>Exercise complete!</p>
          <p className='result'>Typing speed: {calculateTypingSpeed()} key(s) per minute</p>
          <p className='result'>Accuracy: {calculateAccuracy()}%</p>
          <button className='start-again-button' onClick={startExercise}>Start Again</button>
        </div>
      )}
      {endTime === 0 && (
        <button className='end-exercise-button' onClick={endExercise}>End Exercise</button>
      )}
    </div>
  );
};

export default TouchTypingExercise;



