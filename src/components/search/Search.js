import {useDispatch} from "react-redux";
import {setSearchResult} from "../app/AppSlice";
import "./Search.css";
import {useState} from "react";

const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const getData = async (query) => {
        const response = await fetch(query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer BQBvYfJz27iPiGLpAiVytlUa7yOcPvc0fkz6z1c7VdAWUGJpv5qTo_RXzmSTfb8pk4zmPvhDwCWaJ5CA6_dLS8kiRn4r3QkrozFe4OydGEQeTYvPCYTKIDMB_6WNj4NakYFryIKujRnDa3FOtzv-_quuTfDU3GPPlqldh9zNUKEMk9B4VntLU9LsnUu4ODm-cSlnOu4"
            },
        });
        try {
            return await response.json();
        } catch (e) {
            throw new Error(e);
        }
    }
    const onSearchSubmit = (e) => {
        e.preventDefault();
        const queryString = (search).trim();
        console.log(queryString);
        if (!queryString) {
            return;
        }
        getData(`https://api.spotify.com/v1/search?q=${queryString}&type=track%2Cartist%2Calbum&market=ES&limit=10&offset=0`)
            .then(res => dispatch(setSearchResult(res.tracks.items)));
            // .then(res => console.log(res.tracks.items));
    }
    const onSearchInputChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <form className="search-form" onSubmit={onSearchSubmit}>
            <input className="search-input"
                   type="search"
                   name="search-track"
                   value={search}
                   onChange={onSearchInputChange}
            />
            <input type="submit" className="search-submit" value="Search"/>
        </form>
    );
}

export default Search;