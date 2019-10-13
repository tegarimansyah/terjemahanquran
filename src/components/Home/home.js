import React from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../LoadingIndicator/loading'
import Axios from 'axios';

class HomeScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            surah: {}
        };

        this.LoadData = this.LoadData.bind(this);
    }

    componentDidMount() {
        this.LoadData()
    }
    
    LoadData() {
        this.setState({
            surah: [],
        });
        
        trackPromise(
            Axios.get('quran_list/surah_list.json')
            .then(res => {
                const surah = res.data;
                this.setState({ surah });
                // console.log(this.state.surah)
                Object.keys(this.state.surah).map(
                    num_surah => console.log(surah[num_surah])
                    )
            })
        );

    }

    render() {
        return (
            <div className="container relative flex content-between flex-wrap h-screen lg:w-8/12 sm:w-10/12 md:w-10/12">
                    <h3>Home of Quran Affairs</h3>
                    <Link to="/reading_list">Go to somewhere else</Link>
                    <LoadingIndicator/>
                    <ul>
                        { Object.keys(this.state.surah).map(
                            num_surah =>  <li key={num_surah.toString()}> {this.state.surah[num_surah].id.surah_name} </li>
                        )}
                    </ul>
            </div>
        );
    }
}

export default HomeScreen;