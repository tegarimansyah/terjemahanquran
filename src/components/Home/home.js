import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

class HomeScreen extends React.Component {
    render() {
        return (
            <div className="container relative flex content-between flex-wrap h-screen lg:w-8/12 sm:w-10/12 md:w-10/12">
                    <h3>Home of Quran Affairs</h3>
                    <div className="character-place">
                        <img className="character" src={Logo} alt="React Logo" />
                    </div>
                    <Link to="/reading_list">Go to somewhere else</Link>
            </div>
        );
    }
}

export default HomeScreen;