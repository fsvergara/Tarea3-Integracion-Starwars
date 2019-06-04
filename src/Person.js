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
query person($input: ID){
    person(id:$input){
      name
      birthYear
      eyeColor
      gender
      hairColor
      height
      mass
      skinColor
      homeworld
      {
        name
        id
      }
      starshipConnection{
        starships{
          name
          id
        }
      }
      filmConnection{
        films{
          id
          title
        }
      }
    }
  }
`

export default class Person extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            person: {
                starshipConnection: {
                    starships: ['']
                },
                filmConnection: {
                    films: ['']
                },
                homeworld: ['']
            }
        }
    }

    async componentDidMount(){
        const result = await client.query({
            query: query, 
            variables: {input: this.props.match.params.id}
        })
        console.log(result.data.person)
        this.setState({person: result.data.person})
        this.setState({loaded: true})
    }

    render() {

        const person_view = <div>
                            <Typography variant="h2">
                                {this.state.person.name}
                            </Typography>
                            <Paper style={{marginTop: '2%', marginRight:'2%'}}>
                            <Table >
                            <TableBody>
                            <TableRow key={'birthYear'}>
                                <TableCell align="left">Birth Year</TableCell>
                                <TableCell align="left">{this.state.person.birthYear }  </TableCell>
                            </TableRow>
                            <TableRow key={'eyeColor'}>
                                <TableCell align="left">Eye Color</TableCell>
                                <TableCell align="left">{this.state.person.eyeColor}  </TableCell>
                            </TableRow>
                            <TableRow key={'gender'}>
                                <TableCell align="left">Gender</TableCell>
                                <TableCell align="left">{this.state.person.gender}  </TableCell>
                            </TableRow>
                            <TableRow key={'hairColor'}>
                                <TableCell align="left">Hair Color</TableCell>
                                <TableCell align="left">{this.state.person.hairColor}  </TableCell>
                            </TableRow>
                            <TableRow key={'height'}>
                                <TableCell align="left">height</TableCell>
                                <TableCell align="left">{this.state.person.height}  </TableCell>
                            </TableRow>
                            <TableRow key={'mass'}>
                                <TableCell align="left">Mass</TableCell>
                                <TableCell align="left">{this.state.person.mass}  </TableCell>
                            </TableRow>
                            <TableRow key={'skinColor'}>
                                <TableCell align="left">Skin Color</TableCell>
                                <TableCell align="left">{this.state.person.skinColor}  </TableCell>
                            </TableRow>
                            <TableRow key={'skinColor'}>
                                <TableCell align="left">Homeworld</TableCell>
                                <TableCell align="left"><a href={'/planet/'+this.state.person.homeworld.id}>{this.state.person.homeworld.name}  </a> </TableCell>
                            </TableRow>
                            <TableRow key={'movies'}>
                                <TableCell align="left">Appears on</TableCell>
                                <TableCell align="left">
                                    {this.state.person.filmConnection.films.length > 0 ?
                                    this.state.person.filmConnection.films.map((row) => (
                                            <a href={'/films/'+row.id}>{row.title}  </a>
                                    )
                                    ).reduce((prev, curr) => [prev, ', ', curr])
                                    :
                                    <Typography variant="h6">
                                        -
                                    </Typography>
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow key={'starships'}>
                                <TableCell align="left">Starships</TableCell>
                                <TableCell align="left">
                                    {this.state.person.starshipConnection.starships.length > 0 ?
                                        this.state.person.starshipConnection.starships.map((row) => (
                                            <a href={'/starship/'+row.id}>{row.name}  </a>
                                    )
                                    ).reduce((prev, curr) => [prev, ', ', curr])
                                    : 
                                    <Typography variant="h6">
                                        
                                    </Typography>
                                }
                                </TableCell>
                            </TableRow>
                            </TableBody>
                          </Table>
                          </Paper>
                        </div>
        return (
            <div style={{marginLeft:'2%', marginTop:'2%'}}>
                {this.state.loaded ? person_view:<CircularProgress color="primary" />}
            </div>
        )
    }
}