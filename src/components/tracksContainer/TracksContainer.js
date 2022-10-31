import './TracksContainer.css';
import AudioElement from "../audioElement/AudioElement";
import {useDispatch, useSelector} from "react-redux";
import {fetchTracks} from "../app/AppSlice";
import {useEffect} from "react";

const TracksContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTracks());
    }, []);
    const data = useSelector(state => state.searchResult);
    return (
        <main>
            <ol className="tracks-container-items">
                {data.map(track => <AudioElement key={track.id} track={track}/>)}
            </ol>

        </main>
    );
}

export default TracksContainer;