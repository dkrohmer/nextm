import React from 'react';
import ReactDOM from 'react-dom';

import ModelEditor from './ModelEditor'; // Assuming App.tsx is your main component
import './index.css'

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
      <ModelEditor />
  </React.StrictMode>,
  document.getElementById('root')
)