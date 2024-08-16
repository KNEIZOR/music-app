import React from "react";

const Card = ({music, i, selectTrack}) => {

    return (
        <div className="card" onClick={() => selectTrack(i)}>
            <img
                src={music.album_image}
                alt=""
            />
            <div className="title-track">{music.name}</div>
            <div className="artist">{music.artist_name}</div>
        </div>
    );
};

export default Card;
