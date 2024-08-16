import React, { useEffect, useRef, useState } from "react";
import "../styles/musicApp.css";
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const MusicApp = () => {
    const [music, setMusic] = useState({
        headers: {
            status: "success",
            code: 0,
            error_message: "",
            warnings: "",
            results_count: 1,
        },
        results: [
            {
                name: "claudod",
                dispname: "claudod",
                id: "972174",
                lang: "en",
                creationdate: "2010-10-17",
                avatar_type: "uploadedv2",
                avatar: "jpg",
                album_id: "49216",
                tracks: [
                    {
                        id: "391002",
                        name: "Balrog Boogie",
                        releasedate: "2009-07-23",
                        artist_id: "351716",
                        duration: "233",
                        artist_name: "Diablo Swing Orchestra",
                        license_ccurl:
                            "http://creativecommons.org/licenses/by-nc-nd/3.0/",
                        updatedate: "2014-02-18 15:39:55",
                        album_image:
                            "https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002",
                        image: "https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002",
                        audio: "https://prod-1.storage.jamendo.com/?trackid=391002&format=mp31&from=app-devsite",
                        audiodownload:
                            "https://prod-1.storage.jamendo.com/download/track/391002/mp32/",
                        relations: {
                            review: "10",
                            favorite: "0",
                            like: "1",
                        },
                        audiodownload_allowed: true,
                    },
                    {
                        id: "238862",
                        name: "Only God Knows Why",
                        releasedate: "2008-11-14",
                        artist_id: "3498",
                        duration: "338",
                        artist_name: "Nocreeps",
                        license_ccurl:
                            "http://creativecommons.org/licenses/by-sa/3.0/",
                        updatedate: "2013-02-25 12:31:57",
                        album_image:
                            "https://usercontent.jamendo.com?type=album&id=34802&width=300&trackid=238862",
                        image: "https://usercontent.jamendo.com?type=album&id=34802&width=300&trackid=238862",
                        audio: "https://prod-1.storage.jamendo.com/?trackid=238862&format=mp31&from=app-devsite",
                        audiodownload:
                            "https://prod-1.storage.jamendo.com/download/track/238862/mp32/",
                        relations: {
                            review: "10",
                            favorite: "0",
                            like: "1",
                        },
                        audiodownload_allowed: true,
                    },
                    {
                        id: "353341",
                        name: "Yellow Gold",
                        releasedate: "2009-06-06",
                        artist_id: "343767",
                        duration: "289",
                        artist_name: "John Dada &amp; the Weathermen",
                        license_ccurl:
                            "http://creativecommons.org/licenses/by-nc-nd/3.0/",
                        updatedate: "2013-01-17 17:57:48",
                        album_image:
                            "https://usercontent.jamendo.com?type=album&id=46816&width=300&trackid=353341",
                        image: "https://usercontent.jamendo.com?type=album&id=46816&width=300&trackid=353341",
                        audio: "https://prod-1.storage.jamendo.com/?trackid=353341&format=mp31&from=app-devsite",
                        audiodownload:
                            "https://prod-1.storage.jamendo.com/download/track/353341/mp32/",
                        relations: {
                            review: "10",
                            favorite: "0",
                            like: "1",
                        },
                        audiodownload_allowed: true,
                    },
                    {
                        id: "628410",
                        name: "Mi ammazzo di caff\u00e8",
                        releasedate: "2010-08-08",
                        artist_id: "362118",
                        duration: "274",
                        artist_name: "Falsorigo",
                        license_ccurl:
                            "http://creativecommons.org/licenses/by-nc-sa/3.0/",
                        updatedate: "2014-01-20 12:02:52",
                        album_image:
                            "https://usercontent.jamendo.com?type=album&id=72779&width=300&trackid=628410",
                        image: "https://usercontent.jamendo.com?type=album&id=72779&width=300&trackid=628410",
                        audio: "https://prod-1.storage.jamendo.com/?trackid=628410&format=mp31&from=app-devsite",
                        audiodownload:
                            "https://prod-1.storage.jamendo.com/download/track/628410/mp32/",
                        relations: {
                            review: "9",
                            favorite: "0",
                            like: "1",
                        },
                        audiodownload_allowed: true,
                    },
                ],
            },
        ],
    });

    const [mainTrack, setMainTrack] = useState({
        id: "391002",
        name: "Balrog Boogie",
        releasedate: "2009-07-23",
        artist_id: "351716",
        duration: "233",
        artist_name: "Diablo Swing Orchestra",
        license_ccurl: "http://creativecommons.org/licenses/by-nc-nd/3.0/",
        updatedate: "2014-02-18 15:39:55",
        album_image:
            "https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002",
        image: "https://usercontent.jamendo.com?type=album&id=49216&width=300&trackid=391002",
        audio: "https://prod-1.storage.jamendo.com/?trackid=391002&format=mp31&from=app-devsite",
        audiodownload:
            "https://prod-1.storage.jamendo.com/download/track/391002/mp32/",
        relations: {
            review: "10",
            favorite: "0",
            like: "1",
        },
        audiodownload_allowed: true,
    });

    const [progressBar, setProgressBar] = useState(0);
    const [paused, setPaused] = useState(true);
    const [count, setCount] = useState(0);

    const myId = "7d11bf0c";
    const audioplayer = useRef();
    const playBtn = useRef();
    let volume;

    useEffect(() => {
        fetchFn();
    }, [count]);

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async (accessToken) => {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        );
        const data = await response.json();
        setUserDetails(data);
    };
    
    useEffect(() => {
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
            navigate("/");
        }

        getUserDetails(accessToken);
    }, [navigate]);

    useEffect(() => changeTrack(), [count]);

    async function fetchFn() {
        const response = await fetch(
            `https://api.jamendo.com/v3.0/users/tracks/?client_id=${myId}&format=jsonpretty&limit=27&order=rating_desc+updatedate_desc&id=972174`
        );
        const json = await response.json();
        return setMusic(json);
    }

    function selectTrack(id) {
        let track = music.results[0].tracks.find((track) => track.id === id);
        setMainTrack(track);
        if (playBtn.current.classList.contains("fa-pause")) {
            playBtn.current.classList.remove("fa-pause");
            playBtn.current.classList.add("fa-play");
        }
    }

    function audioAct(e) {
        if (e.target.tagName !== "I") return;

        if (paused || e.target.classList.contains("fa-play")) {
            audioplayer.current.play();
            setPaused(!paused);
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
        } else {
            audioplayer.current.pause();
            setPaused(!paused);
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
        }
    }

    let progress;

    function audioProgress() {
        progress =
            Math.floor(audioplayer.current.currentTime) /
            (Math.floor(audioplayer.current.duration) / 100);
        setProgressBar(progress);
    }

    function audioChangeTime(e) {
        if (e.target.tagName !== "PROGRESS") return;
        let mouseX = Math.floor(e.pageX - e.target.offsetLeft);
        progress = mouseX / (e.target.offsetWidth / 100);
        audioplayer.current.currentTime =
            audioplayer.current.duration * (progress / 100);
    }

    function audioChangeVolume(e) {
        volume = e.target.value / 100;
        audioplayer.current.volume = volume;
    }

    function nextTrack() {
        if (count === music.results[0].tracks.length - 1) {
            setCount(0);
        } else {
            setCount(count + 1);
        }
    }

    function changeTrack() {
        setMainTrack(music.results[0].tracks[count]);
    }

    function prevTrack() {
        if (count === 0) {
            setCount(music.results[0].tracks.length - 1);
        } else {
            setCount(count - 1);
        }
    }

    return (
        <div className="music-app__wrapper">
            <header>
                <div className="header-title">KNEIZOR MUSIC</div>
                <div className="profile">
                    <div className="profile-name">{userDetails.email}</div>
                    <img className="profile-img" src={userDetails.picture} alt="" />
                <Link className="exit" to="/">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
                </div>
            </header>
            <main>
                <div className="main-title">Главное</div>
                <div className="main-info">Новые треки, альбомы и сборники</div>
                <div className="cards">
                    {music.results[0].tracks.map((i, key) => (
                        <Card
                            key={key}
                            music={music.results[0].tracks[key]}
                            i={i.id}
                            selectTrack={selectTrack}
                        />
                    ))}
                </div>
                <div className="audioplayer__wrapper">
                    <audio
                        src={mainTrack.audio}
                        preload="metadata"
                        ref={audioplayer}
                        onClick={() => audioAct()}
                        onTimeUpdate={() => audioProgress()}
                    ></audio>
                    <div id="audio">
                        <progress
                            value={progressBar}
                            max="100"
                            className="audio-hud__element audio-hud__progress-bar"
                            id="audio-hud__progress-bar"
                            onClick={(e) => audioChangeTime(e)}
                        ></progress>
                        <div className="player-buttons">
                            <i
                                className="fas fa-angle-double-left"
                                onClick={() => prevTrack()}
                            ></i>
                            <i
                                ref={playBtn}
                                className="fas fa-play"
                                onClick={(e) => audioAct(e)}
                            ></i>
                            <i
                                className="fas fa-angle-double-right"
                                onClick={() => nextTrack()}
                            ></i>
                            <input
                                type="range"
                                value={volume}
                                max="100"
                                title="Громкость"
                                id="audio-hud__volume"
                                onChange={(e) => audioChangeVolume(e)}
                            ></input>
                            <div className="track">
                                <img src={mainTrack.album_image} alt="" />
                                <div className="text">
                                    <div className="title-track">
                                        {mainTrack.name}
                                    </div>
                                    <div className="artist">
                                        {mainTrack.artist_name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    );
};

export default MusicApp;
