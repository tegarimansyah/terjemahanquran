import React from 'react';
import { Link } from 'react-router-dom';

class ReadingList extends React.Component {
    render() {
        return (
            <div className="container relative flex content-between flex-wrap h-screen lg:w-8/12 sm:w-10/12 md:w-10/12">
                    <h3>Home of Quran Affairs - Reading List</h3>
                    <Link to="/">Go to home</Link>
            </div>
        );
    }
}

export default ReadingList;