/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {TextareaAutosize} from '@mui/base';
import {Button} from '@mui/material';

import './App.css';

const $typingBox = document.getElementsByClassName('typing-box');

export default function App() {
  const [text, setText] = useState('');
  const [countdown, setCountdown] = useState(5);

  // There are 3 game state:
  // 1. Null - game hasn't started
  // 2. False - game is running and countdown > 0
  // 3. True - game finishes and coundown = 0
  const [isGameOver, setGameOver] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  function handleTyping(event) {
    const {value} = event.target;
    setText(value);
  }

  function calculateWordcount() {
    if (text !== '') {
      // Use trim() to get rid of space before and after text string
      return text.trim().split(' ').length;
    } else return 0; // If text string is empty, return 0;
  }

  function setGameState() {
    // On game's first start or restarted, clear text and start new countdown
    if (isGameOver === null || isGameOver === true) {
      setText('');
      setCountdown(5);
      setGameOver(false);
    }
  }

  useEffect(() => {
    if (isGameOver === false) {
      if (countdown > 0) {
        setTimeout(() => {
          setCountdown((time) => time - 1);
        }, 1000);

        // Disable button
        setDisabled(true);
      } else {
        setDisabled(false);
        setGameOver(true);
      }
    }
  }, [countdown, isGameOver]);

  return (
    <>
      <h1>How fast do you type?</h1>
      <TextareaAutosize
        className='typing-box'
        onChange={handleTyping}
        value={text}
        aria-label='typing-box'
        minRows={10}
        maxRows={10}
        placeholder={
          // If game hasn't started, show instruction
          isGameOver === null
            ? `Instruction: Press 'START' button to start the game. Type as fast as you can before the coundown ends`
            : 'Start typing here...'
        }
        // If game hasn't started (value: null) or has ended (value: true),
        // disable textarea
        disabled={isGameOver === false ? false : true}
      />

      <h4 className='time-remaining'>
        Time remaining: <span>{countdown}</span>
      </h4>
      <h4 className='word-count'>
        Word count: <span>{calculateWordcount()}</span>
      </h4>
      <Button variant='contained' onClick={setGameState} disabled={isDisabled}>
        {isGameOver === null ? '[ENTER] Start' : '[ENTER] Restart'}
      </Button>
    </>
  );
}
