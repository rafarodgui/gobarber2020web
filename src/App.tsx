import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/Global';

import { AuthProvider } from './context/AuthContext';

import Routes from './routes/index';

const App: React.FC = () => (
    <>
        <AuthProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </AuthProvider>

        <GlobalStyle />
    </>
);

export default App;
