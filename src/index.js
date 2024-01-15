import React from 'react';
import  ReactDOM  from 'react-dom/client';
import App from './components/App';
import { GlobalContext } from './context/GlobalContext';
import './styles/styles.css';


const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render( 
<GlobalContext >
    <App />
</GlobalContext>
)
