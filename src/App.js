import React, {Component} from 'react';
import {AppProvider, Page} from '@shopify/polaris';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText, Col, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import Table from "./Table";

const { BaseLayer, Overlay } = LayersControl

var myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
});

class App extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      location: {
        lat: 12.8797,
        lng: 121.7740,
      },
      haveUsersLocation: false,
      zoom: 6,
      userMessage: {
        name: '',
        message: '',
      },
      collapse: false
    }
  }

  

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) =>  {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude 
        },
        haveUsersLocation: true,
        zoom: 13,
      });
    }, () => {
      console.log('Failure to fetch location');
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
        });
    });
  }

  formSubmitted = (event) => {
    event.preventDefault();
    console.log(this.state.userMessage)
  }

  valueChanged = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
       userMessage: {
          ...prevState.userMessage,
          [name]: value
       }
    }))
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render(){
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <div className="map">
        <div id="navClass">
      	<Navbar id="navClass" color="light" light expand="md">
          <NavbarBrand href="/"><img class="navbar-brand" src="header_green.png"></img></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <a class="mdl-navigation__link main-header-top-link" href="http://sarai.ph/about-us" id="about-us-link">About Us
              </a>
              </NavItem>
              <NavItem>
                <a class="mdl-navigation__link main-header-top-link" href="https://sarai-community.net/" id="sarai-community">Sarai Community
              </a>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="explore-link" >
                  Crops
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Rice
                  </DropdownItem>
                  <DropdownItem>
                    Corn
                  </DropdownItem>
                  <DropdownItem>
                    Banana
                  </DropdownItem>
                  <DropdownItem>
                    Coconut
                  </DropdownItem>
                  <DropdownItem>
                    Coffee
                  </DropdownItem>
                  <DropdownItem>
                    Cacao
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="dss-link" >
                  Maps
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="http://202.92.144.49/">
                    Suitability Maps
                  </DropdownItem>
                  <DropdownItem href="http://139.59.125.198/ndvi">
                    Normalized Difference Vegetation Index
                  </DropdownItem>
                  <DropdownItem href="http://139.59.125.198/rainfall-maps">
                    Rainfall Map
                  </DropdownItem>
                  <DropdownItem href="http://139.59.125.198/agri-drought">
                    SVTR Map
                  </DropdownItem>
                  <DropdownItem href="http://139.59.125.198/evi">
                    Enhanced Vegetation Index
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="get-involved-link" >
                  Services
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="http://sarai.ph/heat-map-rainfall-outlook">
                    Rainfall Outlook
                  </DropdownItem>
                  <DropdownItem href="http://sarai.ph/suitability-gallery">
                    Suitability
                  </DropdownItem>
                  <DropdownItem href="http://139.59.125.198/drought-forecast">
                    Drought Forecast
                  </DropdownItem>
                  <DropdownItem href="http://sarai.ph/weather-monitoring">
                    Weather Monitoring
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
              <a>
                <img class="dost-pcaarrd-uplb-logo" src="dostpcaarrduplb.png" />
              </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
        <Map className="map" center={position} zoom={this.state.zoom}>
        	<LayersControl position="topright" id="layers-control">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OpenTopoMaps">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
           <BaseLayer name="Esri.WorldStreetMap">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png"
            />
          </BaseLayer>
          <BaseLayer name="Esri.WorldImagery">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
            />
          </BaseLayer>
          </LayersControl>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { this.state.haveUsersLocation ?  
              <Marker 
                position={position}
                icon={myIcon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> : ''
           }
        </Map>
         <Card body id='message-form'>
          <CardTitle>Welcome to GuestMap</CardTitle>
          <CardText>Leave a message with your location.</CardText>
          <CardText>Thanks for stopping by.</CardText>
          <Form onSubmit={this.formSubmitted}>
            <FormGroup>
              <Label for="name">Name</Label>
                <Input
                onChange={this.valueChanged} 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Enter your name" />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
                <Input
                onChange = {this.valueChanged} 
                type="textarea"
                name="message" 
                id="message" 
                placeholder="Enter your message" />
            </FormGroup>
            <Button type="submit" color="info" onClick={this.toggle}>Show details</Button> {' '}
          </Form>

        </Card>
        <Collapse isOpen={this.state.collapse}>
          <Table id="myTable" />
        </Collapse>
      </div>
    )
  }
}

export default App;
