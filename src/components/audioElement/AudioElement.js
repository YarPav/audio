import './AudioElement.css';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTrackUrl} from "../app/AppSlice";
import {setIsTrackPlaying} from "../app/AppSlice";

const AudioElement = ({track}) => {
    const dispatch = useDispatch();
    const currentTrackUrl = useSelector(state => state.currentTrackUrl);


    const transformDuration = (duration) => {
        const date = new Date(duration);
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (minutes.toString().length === 1) minutes = '0'+minutes;
        if (seconds.toString().length === 1) seconds = '0'+seconds;
        return `${minutes}:${seconds}`;
    }

    const trackClickHandler = () => {
        if (track.preview_url === null) return;
        dispatch(setCurrentTrackUrl(track.preview_url));
        dispatch(setIsTrackPlaying(true));
    }

    return (
        <li className="audioelement" onClick={trackClickHandler} style={
            {
                backgroundColor: track.preview_url === currentTrackUrl ? "rgba(0, 0, 0, 0.5)" : null,
                opacity: track.preview_url === null ? 0.5 : null,
                cursor:  track.preview_url === null ? "not-allowed" : "pointer"
            }
        }>
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