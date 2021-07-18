import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Container from './component/container';
import EarthAirline from './earthAirline';
import './index.css';
// require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <div className='container-wrap'>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Container>
          <Suspense fallback='loading'>
            <EarthAirline />
          </Suspense>
        </Container>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
