import _ from 'lodash';
import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import SearchBar from './Components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_detail';

const  API_KEY = "AIzaSyC3gmlCq9ZM6VGv-_8lUSEjmsBC9r_4Qfs";

class App extends Component{
    constructor(props){
        super(props);

        this.state={
            videos:[],
            selectedVideo : null
        };
        this.videoSearch('google');
        }

videoSearch(term){
    YTSearch({key:API_KEY,term: term}, (videos) =>{
        this.setState({
            videos : videos,
            selectedVideo : videos[0]
        });
    });
    }

    render(){
        //give 500milisec delay to searchbar input
        const videoSearch = _.debounce((term) =>{this.videoSearch(term)},500);
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect = { selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom .render(<App />,document.querySelector('.container'));