import './AudioElement.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTrackUrl} from "../app/AppSlice";
import {setIsTrackPlaying} from "../app/AppSlice";

const AudioElement = ({track}) => {
    const dispatch = useDispatch();
    const isTrackPlaying = useSelector(state => state.isTrackPlaying);

    // let isAudioPlaying = false,
    //     isProgressChangingByUser = false;
    //
    // const audioplayer = document.querySelector('.audioplayer'),
    //     audioplayerProgress = audioplayer.querySelector('.audioplayer__progress'),
    //     audioplayerProgressBar = audioplayer.querySelector('.audioplayer__progress-bar'),
    //     audioplayerPlayState = audioplayer.querySelector('.audioplayer__playstate'),
    //     audioplayerVolume = audioplayer.querySelector('.audioplayer__volume');
    //
    // const music = new Audio('../static/Linkin Park - In The End.mp3');
    //
    // const init = () => {
    //     music.volume = audioplayerVolume.value;
    //     audioplayerProgressBar.style.width = '0%';
    // }
    //
    // const changePlayState = () => {
    //     isAudioPlaying = !isAudioPlaying;
    //     audioplayerPlayState.classList.toggle('active');
    // }
    //
    // music.addEventListener('timeupdate', () => {
    //     if (isProgressChangingByUser) {
    //         return;
    //     }
    //     const progressBarWidth = music.currentTime * 100 / music.duration;
    //     audioplayerProgressBar.style.width = `${progressBarWidth}%`;
    //     // console.log(music.currentTime);
    // });
    //
    // audioplayerPlayState.addEventListener('click', () => {
    //     if (isAudioPlaying) {
    //         music.pause();
    //     } else {
    //         music.play();
    //     }
    //     changePlayState();
    // });
    // audioplayerVolume.addEventListener('input', () => {
    //     music.volume = audioplayerVolume.value;
    // });
    //
    // const getSongProgress = (e) => {
    //     const offset = e.clientX - audioplayerProgress.offsetLeft,
    //         initialWidth = audioplayerProgress.offsetWidth;
    //     return offset * 100 / initialWidth;
    // }
    //
    // const mouseMoveEvent = (e) => {
    //     const progress = getSongProgress(e);
    //     audioplayerProgressBar.style.width = `${progress}%`;
    // }
    //
    // audioplayerProgress.addEventListener('mousedown', (e) => {
    //     isProgressChangingByUser = true;
    //     const progress = getSongProgress(e);
    //     audioplayerProgressBar.style.width = `${progress}%`;
    //     audioplayerProgress.addEventListener('mousemove', mouseMoveEvent);
    // });
    //
    // audioplayerProgress.addEventListener('mouseup', (e) => {
    //     isProgressChangingByUser = false;
    //     audioplayerProgress.removeEventListener('mousemove', mouseMoveEvent);
    //     const progress = getSongProgress(e);
    //     music.currentTime = music.duration * progress / 100;
    // });
    //
    // music.addEventListener('ended', () => {
    //     isAudioPlaying = false;
    // });
    //
    // init();

    const transformDuration = (duration) => {
        const date = new Date(duration);
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (minutes.toString().length === 1) minutes = '0'+minutes;
        if (seconds.toString().length === 1) seconds = '0'+seconds;
        return `${minutes}:${seconds}`;
    }

    const trackClickHandler = () => {
        dispatch(setCurrentTrackUrl(track.preview_url));
        dispatch(setIsTrackPlaying(true));
    }

    return (
        <li className="audioelement" onClick={trackClickHandler}>
            <div className="audioelement__wrapper">
                <div className="audioelement__info">
                    <p className="audioelement__info-song">{track.name}</p>
                    <p className="audioelement__info-author">{track.artists[0].name}</p>
                </div>
                <div className="audioelement__duration">{transformDuration(track.duration_ms)}</div>
            </div>
        </li>
    );
}

export default AudioElement;