import React, { useState, useEffect } from 'react';
import {
    deleteVideo,
    editUser,
    updateVideoList,
} from '../../services/videoService.js';
import ModuleWindow from './../ModuleWindow/ModuleWindow.jsx';
import { createVideo } from './../../services/videoService.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './VideoList.css';

const VideoList = (props) => {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        updateVideoList(setVideoList);
    }, []);

    const createVideoAction = (video, file) => {
        createVideo(video, file).then((video) =>
            setVideoList([...videoList, video])
        );
    };

    const editVideoAction = (video, file) => {
        editUser(video, file);

        const index = videoList.findIndex((v) => v.id === video.id);
        setVideoList([
            ...videoList.slice(0, index),
            {
                id: video._id,
                title: video.title,
                description: video.description,
                genre: video.genre,
            },
            ...videoList.slice(index + 1, videoList.length),
        ]);
    };

    const deleteVideoAction = (id) => {
        if (!id) return;

        deleteVideo(id);

        const index = videoList.findIndex((v) => v.id === id);
        setVideoList([
            ...videoList.slice(0, index),
            ...videoList.slice(index + 1, videoList.length),
        ]);
    };

    const getVideoById = (id) => {
        if (!id) return null;

        return videoList.find((video) => video.id === id);
    };

    return (
        <>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th className='title'>Title</th>
                            <th className='desc'>Description</th>
                            <th className='genre'>Genre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
                <div className='scroll-list'>
                    <table>
                        <tbody>
                            {videoList.map((video) => {
                                return (
                                    <tr key={video.id}>
                                        <th className='title'>{video.title}</th>
                                        <th className='desc'>
                                            {video.description}
                                        </th>
                                        <th className='genre'>{video.genre}</th>
                                        <th className='action'>
                                            <img
                                                src='https://img.icons8.com/fluency-systems-filled/344/filled-trash.png'
                                                alt='Delete'
                                                onClick={() =>
                                                    deleteVideoAction(video.id)
                                                }
                                            />
                                            <img
                                                src='https://img.icons8.com/material-outlined/344/edit--v1.png'
                                                alt='Edit'
                                                onClick={() => {
                                                    navigate(
                                                        '/edit/' + video.id
                                                    );
                                                }}
                                            />
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Routes>
                <Route
                    path='add/'
                    element={
                        <ModuleWindow
                            btnCaption={'add'}
                            getVideo={(id) => ({
                                title: '',
                                description: '',
                                genre: '',
                            })}
                            resAction={createVideoAction}
                        />
                    }
                />
                <Route
                    path='edit/:id'
                    element={
                        <ModuleWindow
                            btnCaption={'edit'}
                            getVideo={(id) => getVideoById(id)}
                            resAction={(video, file) =>
                                editVideoAction(video, file)
                            }
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default VideoList;
