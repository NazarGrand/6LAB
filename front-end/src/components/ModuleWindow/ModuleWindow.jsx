import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './ModuleWindow.css';

const ModuleWindow = (props) => {
    const { id } = useParams();
    const video = props.getVideo(id);

    const navigate = useNavigate();
    const [title, setTitle] = useState(video.title);
    const [desc, setDesc] = useState(video.description);
    const [genre, setgenre] = useState(video.genre);
    const file = React.createRef();

    const onClickAction = (e) => {
        e.preventDefault();
        props.resAction(
            {
                title: title,
                description: desc,
                genre: genre,
                file: file,
            },
            file.current.files.item(0)
        );

        navigate('/');
    };

    return (
        <div className='wrapper'>
            <NavLink to={'/'} title='Close modal window'>
                <div className='background'></div>
            </NavLink>
            <div className='window'>
                <form>
                    <div className='formRows'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Title'
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                        <br></br>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Description'
                            value={desc}
                            onChange={(event) => {
                                setDesc(event.target.value);
                            }}
                        />
                        <br></br>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Genre'
                            value={genre}
                            onChange={(event) => {
                                setgenre(event.target.value);
                            }}
                        />
                        <br></br>
                        <input type='file' ref={file} />
                        <button onClick={(e) => onClickAction(e)}>
                            {props.btnCaption}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModuleWindow;
