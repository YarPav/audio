import {useDispatch} from "react-redux";
import {setSearchResult} from "../app/AppSlice";
import "./Search.css";
import {useState} from "react";


const redirect_uri = "http://localhost:3000/";
const client_id = "7e89c942d52f409b9f5cd6d46806e9a1";
const client_secret = "01d71798409f4f63a590fc327c77160e";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
let access_token = null;





localStorage.setItem('isAuthorized', getCode() ? 'true' : 'false');
function requestAuthorization() {

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

const getAccessToken = () => {
    let body = "grant_type=authorization_code";
    body += "&code=" + getCode();
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    // const req = fetch(body);
    // const result = await req.then(res => console.log(res));
    // console.log(result);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    access_token = data.token_type + " " + data.access_token;
}

getAccessToken();

if (localStorage.getItem('isAuthorized') === 'false') {
    requestAuthorization();
}

const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const getData = async (query) => {
        console.log(access_token);
        const response = await fetch(query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": access_token
            },
        });
        console.log(getCode());
        try {
            return await response.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        const queryString = (search).trim();
        if (!queryString) {
            return;
        }
        getData(`https://api.spotify.com/v1/search?q=${queryString}&type=track%2Cartist&market=ES&limit=10&offset=0`)
            // .then(res => console.log(res.tracks.items))
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
                   value={search}
                   onChange={onSearchInputChange}
            />
            <input type="submit" className="search-submit" value="Search"/>
        </form>
    );
}

export default Search;