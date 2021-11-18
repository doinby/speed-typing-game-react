import React from 'react';
import {TextareaAutosize} from '@mui/base';
import {Button} from '@mui/material';

import './App.css';

export default function App() {
  return (
    <>
      <h1>How fast do you type?</h1>
      <TextareaAutosize
        aria-label='texarea'
        maxRows={10}
        placeholder='    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      />

      <h4>Time remaining: ???</h4>
      <Button variant='contained'>start</Button>
      <h4>Word count: ???</h4>
    </>
  );
}
