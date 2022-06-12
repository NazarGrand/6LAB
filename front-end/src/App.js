import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import VideoList from './components/VideoList/VideoList.jsx';
import ModuleWindow from './components/ModuleWindow/ModuleWindow.jsx';
import { setStateForAdding, createVideo } from './services/videoService.js';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div>
                <header className='header'>
                    <NavLink to={'/add'}>
                        <button>Add video</button>
                    </NavLink>
                </header>
                <VideoList />
            </div>
        </BrowserRouter>
    );
}

export default App;
