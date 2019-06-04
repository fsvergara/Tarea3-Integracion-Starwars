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
query starship($input: ID){
    starship(id:$input){
        name
        model
        starshipClass
        manufacturers
        costInCredits
        length
        crew
        passengers
        maxAtmospheringSpeed
        hyperdriveRating
        MGLT
        cargoCapacity
        consumables
        pilotConnection{
          pilots{
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

export default class Starship extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded : false,
            starship: {
                manufacturers: [''],
                pilotConnection: {
                    pilots: ['']
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
        console.log(result.data.starship)
        this.setState({starship: result.data.starship})
        this.setState({loaded: true})
    }

    render() {

        const starship_view = <div>
                            <Typography variant="h2">
                                {this.state.starship.name}
                            </Typography>
                            <Paper style={{marginTop: '2%', marginRight:'2%'}}>
                            <Table >
                            <TableBody>
                            <TableRow key={'model'}>
                                <TableCell align="left">Model</TableCell>
                                <TableCell align="left">{this.state.starship.model }  </TableCell>
                            </TableRow>
                            <TableRow key={'starshipClass'}>
                                <TableCell align="left">Starship Class</TableCell>
                                <TableCell align="left">{this.state.starship.starshipClass}  </TableCell>
                            </TableRow>
                            <TableRow key={'costInCredits'}>
                                <TableCell align="left">Cost In Credits</TableCell>
                                <TableCell align="left">{this.state.starship.costInCredits}  </TableCell>
                            </TableRow>
                            <TableRow key={'length'}>
                                <TableCell align="left">Length</TableCell>
                                <TableCell align="left">{this.state.starship.length}  </TableCell>
                            </TableRow>
                            <TableRow key={'crew'}>
                                <TableCell align="left">Crew</TableCell>
                                <TableCell align="left">{this.state.starship.crew}  </TableCell>
                            </TableRow>
                            <TableRow key={'passengers'}>
                                <TableCell align="left">passengers</TableCell>
                                <TableCell align="left">{this.state.starship.passengers}  </TableCell>
                            </TableRow>
                            <TableRow key={'maxAtmospheringSpeed'}>
                                <TableCell align="left">Max Atmosphering Speed</TableCell>
                                <TableCell align="left">{this.state.starship.maxAtmospheringSpeed}  </TableCell>
                            </TableRow>
                            <TableRow key={'hyperdriveRating'}>
                                <TableCell align="left">Hyperdrive Rating</TableCell>
                                <TableCell align="left">{this.state.starship.hyperdriveRating}  </TableCell>
                            </TableRow>
                            <TableRow key={'MGLT'}>
                                <TableCell align="left">MGLT</TableCell>
                                <TableCell align="left">{this.state.starship.MGLT}  </TableCell>
                            </TableRow>
                            <TableRow key={'cargoCapacity'}>
                                <TableCell align="left">Cargo Capacity</TableCell>
                                <TableCell align="left">{this.state.starship.cargoCapacity}  </TableCell>
                            </TableRow>
                            <TableRow key={'consumables'}>
                                <TableCell align="left">Consumables</TableCell>
                                <TableCell align="left">{this.state.starship.consumables}  </TableCell>
                            </TableRow>
                            <TableRow key={'manufacturers'}>
                                <TableCell align="left">Manufacturers</TableCell>
                                <TableCell align="left">{this.state.starship.manufacturers.join(', ')}  </TableCell>
                            </TableRow>
                            <TableRow key={'chars'}>
                                <TableCell align="left">Pilots</TableCell>
                                <TableCell align="left">
                                    {this.state.starship.pilotConnection.pilots.length > 0 ?
                                        this.state.starship.pilotConnection.pilots.map((row) => (
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
                                    {this.state.starship.filmConnection.films.length > 0 ?
                                    this.state.starship.filmConnection.films.map((row) => (
                                            <a href={'/films/'+row.id}>{row.title}  </a>
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
                {this.state.loaded ? starship_view:<CircularProgress color="primary" />}
            </div>
        )
    }
}