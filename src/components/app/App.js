import TracksContainer from "../tracksContainer/TracksContainer";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import {useSelector} from "react-redux";
import Search from "../search/Search";

const App = () => {
    const {currentTrackUrl, searchResult} = useSelector(state => state);
    console.log(searchResult);
    return (
        <>
            <Search/>
            {searchResult.length ? <TracksContainer/> : <h1 className="empty-search-message">Search track or artist</h1>}
            {currentTrackUrl !== 'empty' ? <AudioPlayer/> : null}
        </>
    );
}

export default App;