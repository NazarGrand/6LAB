export const createVideo = (video, file) => {
    const data = new FormData();
    data.append('title', video.title);
    data.append('description', video.desc);
    data.append('genre', video.genre);
    data.append('file', file);

    return fetch('http://localhost:3005/api/file/', {
        method: 'POST',
        body: data,
    })
        .then((res) => {
            return res.json();
        })
        .then((video) => ({
            Id: video._id,
            Title: video.title,
            Description: video.description,
            Genre: video.genre,
        }));
};

export const updateVideoList = (setState) => {
    fetch('http://localhost:3005/api/file/')
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            let _state = [];
            body.map((video) => {
                _state.push({
                    id: video._id,
                    title: video.title,
                    description: video.description,
                    genre: video.genre,
                });
            });

            setState(_state);
        });
};

export const editUser = (video, file) => {
    const data = new FormData();
    data.append('title', video.title);
    data.append('description', video.desc);
    data.append('genre', video.genre);
    data.append('file', file);

    fetch('http://localhost:3005/api/file/' + video.Id, {
        method: 'PUT',
        body: data,
    })
        .then((res) => res.json())
        .then((video) => video);
};

export const deleteVideo = (id) => {
    fetch('http://localhost:3005/api/file/' + id, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((video) => video);
};
