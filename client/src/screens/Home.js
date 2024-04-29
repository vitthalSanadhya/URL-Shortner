import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    const [shortUrl, setShortUrl] = useState('');
    const [longUrl, setLongUrl] = useState('');

    const shortURL = async() => {
        if(isUrlValid(longUrl)){
            const res = await fetch(`http://localhost:5000/convert?url=${longUrl}`);
            const data =await res.json();
            console.log(data);
            setShortUrl(`http://${data.host}/${data.shortUrl}`);
        }
        else{
            alert("enter valid url")
            setLongUrl('');
            setShortUrl('');
        }
        
    };

    // const copyToClipboard = () => {
    //     window.navigator.clipboard.writeText(shortUrl);
    //     // Window.navigator.clipboard.writeText(shortUrl);
    // };
    function isUrlValid(userInput) {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return false;
        else
            return true;
    }

    const copyToClipboard = () => {
        if (shortUrl) {
            window.navigator.clipboard.writeText(shortUrl);
            alert("Copied to clipboard!");
        }
    };
    
    return (
        <div className="container">
            <label htmlFor="url">Url Shortener.</label>
            <p>
                Generate a short url and redirect to
                <br />
                the when a user click on the short Url
            </p>
            <input
                type="text"
                id="url"
                placeholder="Enter Your Url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
            />
            <button onClick={shortURL} id="btn">
                Shorten Url
            </button>
            <div id="result">
                <a href={shortUrl} target="_blank">{shortUrl}</a>
                {shortUrl && (
                <div className='copy' onClick={copyToClipboard}><FontAwesomeIcon icon={faCopy} /></div>
                )}

            </div>
        </div>
    );
}
