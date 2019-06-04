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
query planet($input: ID){
    planet(id:$input){
      name
      diameter
      rotationPeriod
      orbitalPeriod
      gravity
      population
      climates
      terrains
      surfaceWater
      residentConnection {
              residents {
          id
                  name
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

export default class Planet extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            planet: {
                climates: [''],
                terrains: [''],
                residentConnection: {
                    residents: ['']
                },
                filmConnection: {
                    films: ['']
                }
            }
        }
    }

    async componentDidMount(){
        const result = await client.query({
            query: query, 
            variables: {input: this.props.match.params.id}
        })
        console.log(result.data.planet)
        this.setState({planet: result.data.planet})
        this.setState({loaded: true})
    }

    render() {

        const planet_view = <div>
                            <Typography variant="h2">
                                {this.state.planet.name}
                            </Typography>
                            <Paper style={{marginTop: '2%', marginRight:'2%'}}>
                            <Table >
                            <TableBody>
                            <TableRow key={'diameter'}>
                                <TableCell align="left">Diameter</TableCell>
                                <TableCell align="left">{this.state.planet.diameter }  </TableCell>
                            </TableRow>
                            <TableRow key={'rotationPeriod'}>
                                <TableCell align="left">Rotation Period</TableCell>
                                <TableCell align="left">{this.state.planet.rotationPeriod}  </TableCell>
                            </TableRow>
                            <TableRow key={'orbitalPeriod'}>
                                <TableCell align="left">Orbital Period</TableCell>
                                <TableCell align="left">{this.state.planet.orbitalPeriod}  </TableCell>
                            </TableRow>
                            <TableRow key={'gravity'}>
                                <TableCell align="left">Gravity</TableCell>
                                <TableCell align="left">{this.state.planet.gravity}  </TableCell>
                            </TableRow>
                            <TableRow key={'population'}>
                                <TableCell align="left">Population</TableCell>
                                <TableCell align="left">{this.state.planet.population}  </TableCell>
                            </TableRow>
                            <TableRow key={'surfaceWater'}>
                                <TableCell align="left">Surface Water</TableCell>
                                <TableCell align="left">{this.state.planet.surfaceWater}  </TableCell>
                            </TableRow>
                            <TableRow key={'climates'}>
                                <TableCell align="left">Climates</TableCell>
                                <TableCell align="left">{this.state.planet.climates.join(', ')}  </TableCell>
                            </TableRow>
                            <TableRow key={'terrains'}>
                                <TableCell align="left">Terrains</TableCell>
                                <TableCell align="left">{this.state.planet.terrains.join(', ')}  </TableCell>
                            </TableRow>
                            <TableRow key={'chars'}>
                                <TableCell align="left">Characters</TableCell>
                                <TableCell align="left">
                                    {this.state.planet.residentConnection.residents.length > 0 ?
                                        this.state.planet.residentConnection.residents.map((row) => (
                                            <a href={'/person/'+row.id}>{row.name}  </a>
                                    )
                                    ).reduce((prev, curr) => [prev, ', ', curr])
                                    :
                                    <Typography variant="h6">
                                        
                                    </Typography>
                                }
                                </TableCell>
                            </TableRow>
                            <TableRow key={'movies'}>
                                <TableCell align="left">Appears on</TableCell>
                                <TableCell align="left">
                                    {this.state.planet.filmConnection.films.length > 0 ?
                                    this.state.planet.filmConnection.films.map((row) => (
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
                            </TableBody>
                          </Table>
                          </Paper>
                        </div>
        return (
            <div style={{marginLeft:'2%', marginTop:'2%'}}>
                {this.state.loaded ? planet_view:<CircularProgress color="primary" />}
            </div>
        )
    }
}