import {useDispatch} from "react-redux";
import {setSearchResult} from "../app/AppSlice";
import "./Search.css";

const Search = () => {
    const dispatch = useDispatch();
    const getData = async (query) => {
        const response = await fetch(query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer BQDdZ2k5glBy6VwvwvW4PvzEDO8vKfX-MNLfW1DCWioVfJ09DenG8XQ0dE-KnWIuJUodoHdIM_aaWtZLiiCOQrelpxlUcmYmoQZ_LTnfzVz2w_2i79tQL-PTDtjC-G82jJ64hSllLr1UB5ReWq2pAorzRX72ksZoLK5-j_BGOxSxJ-nXi9aN7ruBiZXbz93_tXoYxQw"
            },
        });
        try {
            return await response.json();
        } catch (e) {
            throw new Error(e);
        }
    }
    const onSearchInputChange = (e) => {
        const queryString = (e.target.value).trim();
        console.log(queryString);
        if (!queryString) {
            return;
        }
        getData(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track%2Cartist%2Calbum&market=ES&limit=10&offset=0`)
            .then(res => dispatch(setSearchResult(res.tracks.items)));
    }
    return (
        <form className="search-form">
            <input className="search-input" type="search" name="search-track" onBlur={onSearchInputChange}/>
            <input type="submit" className="search-submit" value="Search"/>
        </form>

    );
}

export default Search;