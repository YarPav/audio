import TracksContainer from "../tracksContainer/TracksContainer";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import {useSelector} from "react-redux";
import Search from "../search/Search";

const App = () => {
    const {currentTrackUrl, searchResult} = useSelector(state => state);
    return (
        <>
            <Search/>
            {searchResult && <TracksContainer/>}
            {currentTrackUrl && <AudioPlayer/>}
        </>
    );
}

export default App;