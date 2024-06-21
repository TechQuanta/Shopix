import React, { useState } from 'react'
import { Button } from '@mui/material';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../../autocomplete/Autocomplete';

const SearchBox = () => {
    const [query, setQuery] = useState();

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`);
    }
    return (
        <>
            <div className="headersearch ml-3 mr-3">
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder='Search for products...' onChange={(e) => setQuery(e.target.value)} />
                    <Button type='submit'><IoSearch /></Button>
                </form>
            </div>
            {query?.length > 2 && <Autocomplete changeWord={query} />}
        </>
    )
}

export default SearchBox