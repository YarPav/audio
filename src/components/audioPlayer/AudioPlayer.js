import './AudioPlayer.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setIsTrackPlaying} from "../app/AppSlice";

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const {isTrackPlaying, currentTrackUrl} = useSelector(state => state);
    const [audioPlayerVolume, setAudioPlayerVolume] = useState(0.01);
    const [audioPlayerProgressBar, setAudioPlayerProgressBar] = useState(0);
    const [audioElement, setAudioElement] = useState(new Audio());
    useEffect(() => {
        audioElement.addEventListener('timeupdate', () => {
            const progressBarWidth = audioElement.currentTime * 100 / audioElement.duration;
            setAudioPlayerProgressBar(progressBarWidth);
        });
        audioElement.addEventListener('ended', () => {
            dispatch(setIsTrackPlaying(false));
        });
    }, []);
    useEffect(() => {
        audioElement.src = currentTrackUrl;
        audioElement.volume = audioPlayerVolume;
    }, [currentTrackUrl]);
    useEffect(() => {
        isTrackPlaying ? audioElement.play() : audioElement.pause();
    }, [isTrackPlaying, currentTrackUrl]);
    useEffect(() => {
        audioElement.volume = audioPlayerVolume;
    }, [audioPlayerVolume]);
    const getSongProgress = (e) => {
        const offset = e.clientX - e.currentTarget.offsetLeft,
            initialWidth =  e.currentTarget.offsetWidth;
        return offset * 100 / initialWidth;
    }
    const onProgressClick = (e) => {
        const progress = getSongProgress(e);
        setAudioPlayerProgressBar(progress);
        audioElement.currentTime = audioElement.duration * progress / 100;
    }

    const onVolumeChange = (e) => {
        setAudioPlayerVolume(parseFloat(e.target.value));
    }
    const onAudioStateBtnClick = () => {
        dispatch(setIsTrackPlaying(!isTrackPlaying));
    }
    return (
        <section className="audioplayer">
            <button className="audioplayer__playstate" onClick={onAudioStateBtnClick}></button>
            <div className="audioplayer__progress"
                 // onMouseDown={onProgressMouseDown}
                 // onMouseUp={onProgressMouseUp}
                onClick={onProgressClick}
            >
                <div className="audioplayer__progress-bar" style={{width: audioPlayerProgressBar + "%"}}></div>
            </div>
            <input onChange={onVolumeChange}
                   value={audioPlayerVolume}
                   min="0"
                   max="0.5"
                   step="0.01"
                   type="range"
                   className="audioplayer__volume styled-slider slider-progress"
            />
        </section>
    );
}

export default AudioPlayer;