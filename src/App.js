import React, { Component }  from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography} from '@material-ui/core';
import {client} from './Client';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';

const query = gql`
query {
  allFilms{
    films{
      id
      title
      director
      producers
      releaseDate
      episodeID
    }
  }
}
`
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded : false,
      films: []
    }
  }

  async componentDidMount(){
    const films = await client.query({
      query: query,
      }
    )
    this.setState({films: films.data.allFilms.films})
    this.setState({loaded: true})
    console.log(films.data.allFilms.films)
  }


  render() {

    const table_view = 
    <Table >
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell align="right">Date</TableCell>
        <TableCell align="right">Director</TableCell>
        <TableCell align="right">Producers</TableCell>
        <TableCell align="right">Episode</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {this.state.films.map(row => (
        <TableRow key={row.name}>
          <TableCell >

          <a href={"/films/"+row.id}>{row.title}</a>
          </TableCell>
          <TableCell align="right">{row.releaseDate}</TableCell>
          
          <TableCell align="right">{row.director}</TableCell>
          <TableCell align="right">{row.producers.join(', ')}</TableCell>
          <TableCell align="right">{row.episodeID}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
    return (
      <div>
        <div className="App" style={{marginTop:'2%', marginLeft:'2%', marginRight:'2%'}}>
        <Typography variant="h2" align='left' style={{marginBottom:'1%'}} >
          Films
        </Typography>
        <Paper >
          {this.state.loaded ? table_view: <CircularProgress color="primary" />}
         </Paper>
        </div>
      </div>
    )
  }
}


export default App;
