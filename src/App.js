/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {TextareaAutosize} from '@mui/base';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import './App.css';

export default function App() {
  const COUNTDOWN_VALUE = 15;

  const [text, setText] = useState('');
  const [countdown, setCountdown] = useState(COUNTDOWN_VALUE);

  // There are 3 game state:
  // 1. Null - game hasn't started.
  // 2. False - game is running and countdown > 0.
  // 3. True - game finishes and coundown = 0.
  const [isGameOver, setGameOver] = useState(null);
  const [isDisabled, setDisabled] = useState(false);
  const typingBoxRef = useRef(null);

  function handleTyping(event) {
    const {value} = event.target;
    setText(value);
  }

  function calculateWordcount() {
    if (text !== '') {
      // Use trim() to get rid of space before and after text string.
      return text.trim().split(' ').length;
    } else return 0; // If text string is empty, return 0.
  }

  function setGameState() {
    // On the game's first start/restart, clear text and start new countdown.
    if (isGameOver === null || isGameOver === true) {
      setText('');
      setCountdown(COUNTDOWN_VALUE);
      setGameOver(false);

      // Note: React runs setState asynchronously; it doesn't wait for the prev
      // line of code to finish before running the next one. Prev state setGameOver(false)
      // supposes to run BEFORE typingBoxRef.current.focus(), but doesn't. Hence
      // we need to manually enabled typing box so it could be focused.

      // BUG FIX: Manually overwritten so the next line could work.
      typingBoxRef.current.disabled = false;
      typingBoxRef.current.focus();
    }
  }

  useEffect(() => {
    if (isGameOver === false) {
      if (countdown > 0) {
        setTimeout(() => {
          setCountdown((time) => {
            const $countdown = document.querySelector('#countdown');
            if (Number($countdown.value) < 15) {
              $countdown.style.color = 'red';
            }
            return time - 1;
          });
        }, 1000);

        // Disable button.
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
          // If game hasn't started, show instruction.
          isGameOver === null
            ? `Instruction: Press 'START' button to start the game. Type as fast as you can before the coundown ends`
            : 'Start typing here...'
        }
        // If game hasn't started or has ended, disable textarea.
        disabled={isGameOver === false ? false : true}
        ref={typingBoxRef}
      />

      <Button
        className='start-btn'
        variant='contained'
        onClick={setGameState}
        disabled={isDisabled}
      >
        {isGameOver === null ? 'Start' : 'Try again!'}
      </Button>

      <TableContainer component={Paper} className='result-table'>
        <Table aria-label='result-table'>
          <TableBody>
            <TableRow>
              <TableCell>Time remaining:</TableCell>
              <TableCell id='countdown'>{countdown}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Word count:</TableCell>
              <TableCell>{calculateWordcount()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
