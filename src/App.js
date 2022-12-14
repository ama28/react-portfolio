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
import Projects from './Projects.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: `url('${process.env.PUBLIC_URL}/assets/images/background.jpg')`,
      currentPage: 'Work',
      data: '',
      projects: [],
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
      ],
    }
    this.updateGameData = this.updateGameData.bind(this)
    this.updateProjectData = this.updateProjectData.bind(this)
  }

  /* Changes background when switching a page 
    (not currently in use — all pages have the same background) */
  switchPage = (backgroundURL, nextPage) => {
    this.setState(prevState => ({
      ...prevState,
      background: backgroundURL,
      currentPage: nextPage
    }))
  }

  /* Parse through the two csv files upon startup */
  componentDidMount() {
    Papa.parse(GamePosts, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: this.updateGameData
    });

    Papa.parse(Projects, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: this.updateProjectData
    });
  }

  /* Filter data from the parsed projects csv into the projects state variable*/
  updateProjectData(result) {
    const data = result.data.map((project, idx) => {
      return {
        title: project.title,
        imageURL: `url(${process.env.PUBLIC_URL}/assets/images/` + project.imageURL + `)`,
        skills: project.skills,
        category: {
          design: project.category.includes("design"),
          games: project.category.includes("games"),
          research: project.category.includes("research"),
        },
      }
    })
    this.setState({projects: data});
  }

  /* Helper function for updateGameData: reformats any image entry in the csv in the form, 
     __.jpg/jpeg/svg/png to the format necessary to find the source file in the project */
  formatImages(inputString) {
    let temp = inputString
    temp = temp.replace(/\w*.jpg\b/, '/assets/images/$&')
    temp = temp.replace(/\w*.svg\b/, '/assets/images/$&')
    temp = temp.replace(/\w*.png\b/, '/assets/images/$&')
    temp = temp.replace(/\w*.jpeg\b/, '/assets/images/$&')
    return temp;
  }

  /* Helper function for updateGameData: combines headers and sections into a 2D array 
     where each index is an array of size 2 containing a header and its corresponding section */
  to2Darray(headers, sections) {
    let headerArray = headers.split(', ');

    let sectionsWithImages = this.formatImages(sections)
    let sectionArray = sectionsWithImages.split('\\section ') //sections are delimited by "\section" in the csv

    let result = [];
    for ( let i = 0; i < headerArray.length; i++ ) {
      result.push( [ headerArray[i], sectionArray[i] ] );
    }
    return result;
  }
  
  /* Filter data from the parsed game posts csv into the gamePosts state variable*/
  updateGameData(result) {
    const data = result.data.map((post, idx) => {
      return {
        title: post.title,
        imageURL: `${process.env.PUBLIC_URL + "/assets/images/" + post.imageURL}`,
        starCount: parseInt(post.rating),
        description: post.description,
        content: this.to2Darray(post.headers, post.sections),
      }
    })
    this.setState({gamePosts: data});
  }
  
  render() {
    // storing a style for the background here so that switchPage can alter it if necessary
    const backgroundStyle = {
      backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/darkened_background.jpg')`,
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

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App