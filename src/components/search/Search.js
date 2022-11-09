import {useDispatch} from "react-redux";
import {setSearchResult} from "../app/AppSlice";
import "./Search.css";
import {useEffect, useState} from "react";


const refresh_token = "AQBkakLFsAGoZ_3-BziwJsORK6cOAKZZCgAA-7FCU6UtKVtG3AXFIQJdpJyRnukrZqDVaeDtZ-AGgKGjMipFQY4UJpekqao7u-xvhOFvgJ53khlt9n7vRSOgGzCJ5egFRGA";
const client_id = "7e89c942d52f409b9f5cd6d46806e9a1";
const client_secret = "01d71798409f4f63a590fc327c77160e";
let access_token = null;

const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        setToken();
    }, []);
    const setToken = () => {
        getToken().then(res => access_token = res.token_type + " " + res.access_token);
    }
    const getData = async (query) => {
        const response = await fetch(query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Authorization": localStorage.getItem('access_token')
                "Authorization": access_token
            },
        });
        // console.log(getCode());
        try {
            if (await !response.ok) {
                setToken();
                onSearchSubmit();
            }
            return await response.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    const getToken = async () => {
        const req = await fetch(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
            }
        })
        try {
            return await req.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    const onSearchSubmit = (e) => {
        e?.preventDefault();
        const queryString = (search).trim();
        if (!queryString) {
            return;
        }
        getData(`https://api.spotify.com/v1/search?q=${queryString}&type=track%2Cartist&market=ES&limit=10&offset=0`)
            .then(res => dispatch(setSearchResult(res.tracks.items)))

    }
    const onSearchInputChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <form className="search-form" onSubmit={onSearchSubmit}>
            <input className="search-input"
                   type="search"
                   name="search-track"
                   placeholder="Search track or artist..."
                   value={search}
                   onChange={onSearchInputChange}
            />
            <input type="submit" className="search-submit" value="Search"/>
        </form>
    );
}

export default Search;