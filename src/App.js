import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
import Select from 'react-select';
import Draggable from 'react-draggable';
import { Card, CardImg, CardBody, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText, Col, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Map, TileLayer, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import {Table} from "./Table";

import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
        MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
        } from "mdbreact";
import Tabletop from 'tabletop';
import {Modal} from 'react-bootstrap';


const { BaseLayer, Overlay } = LayersControl


const options = [
  { value: 'banana', label: 'Banana' },
  { value: 'cacao', label: 'Cacao' },
  { value: 'corn', label: 'Corn' },
  { value: 'rice', label: 'Rice' },
  { value: 'soya', label: 'Soya' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'tomato', label: 'Tomato' },
];

const province = [
  { value: 'laguna', label: 'Laguna' },
  { value: 'oriental mindoro', label: 'Oriental Mindoro' },
  { value: 'isabela', label: 'Isabela' },
];

const municipality = [
  { value: 'victoria', label: 'Victoria' },
  { value: 'los baños', label: 'Los Baños' },
  { value: 'jones', label: 'Jones' },
];

var blueIcon = L.icon({
    iconUrl: 'banana1.png',
    iconSize: [50, 50],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var greenIcon = L.icon({
    iconUrl: 'corn1.png',
    iconSize: [50, 50],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var redIcon = L.icon({
    iconUrl: 'rice1.png',
    iconSize: [50, 50],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});



class App extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { 
      location: {
        lat: 12.8797,
        lng: 121.7740,
      },
      haveUsersLocation: false,
      zoom: 13,
      userMessage: {
        name: '',
        message: '',
      },
      collapse: false,
      collapseCard: true,
      dropdownOpen: false,
      selectedOption: null,
      selectedProvince: null,
      selectedMunicipality: null,
      markers: [
      { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
      { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
      { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
      ],
      dataSet: [],
      tableRows: [],
      modal: false,
      show: false,
    };

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

    Tabletop.init({
      key: '1UEUrcBZWiPYr3f0sOEpcaS5SjpaFO1Dm7e2l47uOaRg',
      callback: googleData => {
        console.log(googleData)
        this.setState({
          tableRows: googleData.map((post) => {
            return (
              {
                button: <div>
                        <MDBBtn onClick={this.toggleModal}>+</MDBBtn>
                        </div>
                        ,
                crop: post.crop,
                pH: post.pH,
                om: post.om,
                nitrogen: post.nitrogen,
                phosphorus: post.phosphorus,
                pAnalysis: post.pAnalysis,
                potassium: post.potassium,
              }
            )
          })
        })
      },
      simpleSheet: true
    })
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

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleCard() {
    this.setState(state => ({ collapseCard: !state.collapseCard }));
  }

  buttonToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropDownChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  dropDownProvince = selectedProvince => {
    this.setState({ selectedProvince });
    console.log(`Option selected:`, selectedProvince);
  }

  dropDownMunicipality = selectedMunicipality => {
    this.setState({ selectedMunicipality });
    console.log(`Option selected:`, selectedMunicipality);
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  render(){
    const position = [this.state.location.lat, this.state.location.lng]
    const { selectedOption } = this.state;
    const { selectedProvince } = this.state;
    const { selectedMunicipality } = this.state;
    const {dataSet} = this.state;

    const dataSheet = {
      columns: [
        {
          label: '+',
          field: 'crop',
          sort: 'asc',
          width: 10
        },
        {
          label: 'Crop',
          field: 'crop',
          sort: 'asc',
          width: 150
        },
        {
          label: 'pH',
          field: 'pH',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Organic Matter (OM) %',
          field: 'om',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Nitrogen (N) %',
          field: 'nitrogen',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Phosphorus (P) ppm',
          field: 'phosphorus',
          sort: 'asc',
          width: 270
        },
        {
          label: 'P Analysis (P)',
          field: 'pAnalysis',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Potassium (K) cmolc/kg soil',
          field: 'potassium',
          sort: 'asc',
          width: 270
        },
      ],
      rows: this.state.tableRows
    };

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



        <Map className="map" center={position} zoom={this.state.zoom} zoomControl={false}>
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
            <Marker 
                position={[13.1554, 121.1888]} icon={blueIcon}>
                <Popup>
                Province: Oriental Mindoro
                <br /> 
                Crop: Banana
                <br />
                ph: Moderately Acidic
                <br /> 
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
            <Marker 
                position={[14.1666, 121.2511]} icon={greenIcon}>
                <Popup>
                Province: Laguna
                <br /> 
                Crop: Corn
                <br />
                ph: Neutral
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
            <Marker 
                position={[16.6994, 121.6583]} icon={redIcon}>
                <Popup>
                Province: Isabela
                <br /> 
                Crop: Rice
                <br />
                ph: Very Strongly Acidic
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
             <Marker 
                position={[16.5758, 121.6906]} icon={blueIcon}>
                <Popup>
                Province: Isabela
                <br /> 
                Crop: Banana
                <br />
                ph: Moderately Acidic
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
             <Marker 
                position={[16.7294, 121.6883]} icon={redIcon}>
                <Popup>
                Province: Isabela
                <br />
                Crop: Rice
                <br /> 
                ph: Strongly Acidic
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
            <Marker 
                position={[13.1871, 121.212]} icon={redIcon}>
                <Popup>
                Province: Oriental Mindoro
                <br /> 
                Crop: Rice
                <br />
                ph: Very Strongly Acidic
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
             <Marker 
                position={[13.1811, 121.1924]} icon={redIcon}>
                <Popup>
                Province: Oriental Mindoro
                <br /> 
                Crop: Rice
                <br />
                ph: Very Strongly Acidic
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
             <Marker 
                position={[13.187, 121.2131]} icon={redIcon}>
                <Popup>
                Province: Oriental Mindoro
                <br /> 
                Crop: Rice
                <br />
                ph: Very Strongly Acidic
                <br />
                <a href="http://localhost:3000/">See More</a>
                </Popup>
            </Marker>
           
          <ZoomControl position="bottomleft" />
          

        </Map>

        <Collapse isOpen={this.state.collapseCard}>
        <Draggable bounds = {{left: 2, top: 2, right: 900, bottom: 150}}>
        
         <Card body id='message-form'>
          <CardImg top width="50%" height="50%" src="SoilsCardTitle.png" draggable="false"/>
          <CardText>Select Province</CardText>
          <Form onSubmit={this.formSubmitted}>

            <FormGroup row>
              <Label for="exampleSelect"></Label>
              <Col sm={10}>
                <Select value={selectedProvince} onChange={this.dropDownProvince} options={province}/>
              </Col>
            </FormGroup>
          </Form>
          <CardText>Select Municipality</CardText>
          <Form onSubmit={this.formSubmitted}>

            <FormGroup row>
              <Label for="exampleSelect"></Label>
              <Col sm={10}>
                <Select value={selectedMunicipality} onChange={this.dropDownMunicipality} options={municipality}/>
              </Col>
            </FormGroup>
            
            
          </Form>
          <CardText>Select Crop</CardText>
          <Form onSubmit={this.formSubmitted}>

            <FormGroup row>
              <Label for="exampleSelect"></Label>
              <Col sm={10}>
                <Select value={selectedOption} onChange={this.dropDownChange} options={options}/>
              </Col>
            </FormGroup>
            <Button type="submit" color="info" onClick={this.toggle}>Search</Button> {' '}
          </Form>
          </Card>
          
        </Draggable>
        </Collapse>

        <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBDataTable striped bordered hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} 
              data={dataSheet} 
            />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        </MDBRow>
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} fullHeight position="bottom">
        <MDBModalHeader toggle={this.toggleModal}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModal}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>



      </div>
    )
  }
  
}

export default App;
