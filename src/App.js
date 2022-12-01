import React, {Component} from 'react';
import './App.css';
import Work from './pages/Work.js';
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Games from './pages/Games';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Archive from './pages/Archive';
import NavBar from './components/NavBar';
import Papa from "papaparse";
import GamePosts from './GamePosts.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: `url('${process.env.PUBLIC_URL}/assets/images/background.jpg')`,
      currentPage: 'Work',
      data: '',
      projects: [
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/c1.png')`,
            title:'Design Internship Program',
            skills:'UX DESIGN · UX RESEARCH',
            category: {design: true, games: false, research: true}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/escape_dartist.svg')`,
            title:'Escape Dartist VR',
            skills:'GAME DESIGN · LEVEL DESIGN · XR · 3D ART',
            category: {design: false, games: true, research: false}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/channel.png')`,
            title:'Channel',
            skills:'GAME DESIGN · PROGRAMMING',
            category: {design: false, games: true, research: false}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/fitsaber.png')`,
            title:'Fitsaber',
            skills:'RESEARCH · PROGRAMMING',
            category: {design: false, games: true, research: true}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/fitsaber.png')`,
            title:'Fitsaber',
            skills:'RESEARCH · PROGRAMMING',
            category: {design: false, games: true, research: true}
        },
      ],
      gamePosts: [],
      archivedProjects: [
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/c1.png')`,
            title:'Design Internship Program',
            skills:'UX DESIGN · UX RESEARCH',
            category: {design: true, games: false, research: true}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/escape_dartist.svg')`,
            title:'Escape Dartist VR',
            skills:'GAME DESIGN · LEVEL DESIGN · XR · 3D ART',
            category: {design: false, games: true, research: false}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/channel.png')`,
            title:'Channel',
            skills:'GAME DESIGN · PROGRAMMING',
            category: {design: false, games: true, research: false}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/fitsaber.png')`,
            title:'Fitsaber',
            skills:'RESEARCH · PROGRAMMING',
            category: {design: false, games: true, research: true}
        },
        {
            backgroundImgURL: `url('${process.env.PUBLIC_URL}/assets/images/fitsaber.png')`,
            title:'Fitsaber',
            skills:'RESEARCH · PROGRAMMING',
            category: {design: false, games: true, research: true}
        },
      ],
    }
    this.updateData = this.updateData.bind(this)
  }

  switchPage = (backgroundURL, nextPage) => {
    this.setState(prevState => ({
      ...prevState,
      background: backgroundURL,
      currentPage: nextPage
    }))
  }

  componentDidMount() {
    Papa.parse(GamePosts, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data.map((post, idx) => {
      return {
        title: post.title,
        imageURL: `${process.env.PUBLIC_URL + "/assets/images/" + post.imageURL}`,
        starCount: parseInt(post.rating),
        description: post.description
      }
    })
    this.setState({gamePosts: data});
  }
  
  render() {
    const backgroundStyle = {
      backgroundImage: this.state.background,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    }

    return (
      <div style={backgroundStyle}>
        {/* ======= Navigation Router ======= */}
        <Router>
          <NavBar 
            switchPage={this.switchPage.bind(this)}
            currentPage={this.state.currentPage}/>

          {/* A <Routes> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Work projects={this.state.projects}/>}/>
            <Route path="/about" element={<AboutMe gamePosts={this.state.gamePosts}/>}/>
            <Route path="/games" element={<Games gamePosts={this.state.gamePosts}/>}/>
            <Route path="/archive" element={<Archive archivedProjects={this.state.archivedProjects}/>}/>
          </Routes>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App