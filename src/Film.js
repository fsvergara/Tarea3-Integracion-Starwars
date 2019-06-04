import React, { Component } from 'react'
import { client } from './Client';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const query = gql`
query film($input: ID){
    film(id:$input){
      title
      episodeID
      director
      producers
      releaseDate
      openingCrawl
      characterConnection {
              characters {
          id
                  name
              }
      }
      planetConnection{
        planets{
          id
          name
        }
      }
      starshipConnection{
        starships{
          id
          name
        }
      }
    }
  }
`



export default class Film extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            film: {
                producers: [''],
                characterConnection: {
                    characters: ['']
                },
                planetConnection: {
                    planets: ['']
                },
                starshipConnection: {
                    starships: ['']
                }
            }
        }
    }

    async componentDidMount(){
        const result = await client.query({
            query: query, 
            variables: {input: this.props.match.params.id}
        })
        console.log(result.data.film)
        this.setState({film: result.data.film})
        this.setState({loaded: true})
    }

    render() {

        const movie_view = <div>
                            <Typography variant="h2">
                                {this.state.film.title}
                            </Typography>
                            <Paper style={{marginTop: '2%', marginRight:'2%'}}>
                            <Table >
                            <TableBody>
                            <TableRow key={'episode'}>
                                <TableCell align="left">Episode</TableCell>
                                <TableCell align="left">{this.state.film.episodeID}  </TableCell>
                            </TableRow>
                            <TableRow key={'date'}>
                                <TableCell align="left">Release Date</TableCell>
                                <TableCell align="left">{this.state.film.releaseDate}  </TableCell>
                            </TableRow>
                            <TableRow key={'crawl'}>
                                <TableCell align="left">Opening Crawl</TableCell>
                                <TableCell align="left">{this.state.film.openingCrawl}  </TableCell>
                            </TableRow>
                            <TableRow key={'director'}>
                                <TableCell align="left">Director</TableCell>
                                <TableCell align="left">{this.state.film.director}  </TableCell>
                            </TableRow>
                            <TableRow key={'prod'}>
                                <TableCell align="left">Producers</TableCell>
                                <TableCell align="left">{this.state.film.producers.join(', ')}  </TableCell>
                            </TableRow>
                            <TableRow key={'chars'}>
                                <TableCell align="left">Characters</TableCell>
                                <TableCell align="left">
                                {this.state.film.characterConnection.characters.map((row) => (
                                            <a href={'/person/'+row.id}>{row.name}</a>
                                    )
                                    ).reduce((prev, curr) => [prev, ', ', curr])}
                                </TableCell>
                            </TableRow>
                            <TableRow key={'planets'}>
                                <TableCell align="left">Planets</TableCell>
                                <TableCell align="left">
                                    {this.state.film.planetConnection.planets.map((row) => (
                                                <a href={'/planet/'+row.id}>{row.name}</a>
                                        )
                                        ).reduce((prev, curr) => [prev, ', ', curr])}
                                </TableCell>
                            </TableRow>
                            <TableRow key={'starships'}>
                                <TableCell align="left">Starships</TableCell>
                                <TableCell align="left">
                                {this.state.film.starshipConnection.starships.map((row) => (
                                            <a href={'/starship/'+row.id}>{row.name}  </a>
                                    )
                                    ).reduce((prev, curr) => [prev, ', ', curr])}
                                </TableCell>
                            </TableRow>
                            </TableBody>
                          </Table>
                          </Paper>
                        </div>
        return (
            <div style={{marginLeft:'2%', marginTop:'2%'}}>
                {this.state.loaded ? movie_view:<CircularProgress color="primary" />}
            </div>
        )
    }
}
