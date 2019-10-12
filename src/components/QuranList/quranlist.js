import React from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../LoadingIndicator/loading'
import Axios from 'axios';

class ReadingList extends React.Component {
    constructor() {
        super();

        this.state = {
            surah: [],
        };

        this.LoadData = this.LoadData.bind(this);
    }

    LoadData() {
        this.setState({
            surah: [],      
        });

        trackPromise(
            Axios.get('http://api.alquran.cloud/v1/surah/1').then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              })
        );

        trackPromise(
            Axios.get('quran_list/2.json').then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              })
        );
    }

    render() {
        return (
            <div className="container relative flex content-between flex-wrap h-screen lg:w-8/12 sm:w-10/12 md:w-10/12">
                    <h3>Home of Quran Affairs - Reading List</h3>
                    <Link to="/">Go to home</Link><br />
                    <button onClick={this.LoadData} title="Click me">Click Me</button>
                    <LoadingIndicator/>
            </div>
        );
    }
}

export default ReadingList;