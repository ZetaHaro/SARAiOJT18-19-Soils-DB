import React, {Component, Fragment} from 'react';
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
//import {BananaMarkers} from "./BananaMarkers";

import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
        MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBTable, 
        MDBTableBody, MDBTableHead
        } from "mdbreact";
import Tabletop from 'tabletop';
import {Modal, Glyphicon} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

type Position = [number, number];

type Props = {|
  content: string,
  position: Position,
  icon: bananaIcon
|};

type MarkerData = {| ...Props, key: string |};

const MyPopupMarker = ({ content, position, icon }: Props) => (
  <Marker position={position} icon={icon}>
    <Popup>{content}</Popup>
  </Marker>
);

const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
};

type State = {
  markers: Array<MarkerData>,
};



const { BaseLayer, Overlay } = LayersControl;


const options = [
  { value: 'banana', label: 'Banana' },
  { value: 'cacao', label: 'Cacao' },
  { value: 'corn', label: 'Corn' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'rice', label: 'Rice' },
  { value: 'soya', label: 'Soya' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'all', label: 'All' },
];

const province = [
  { value: 'laguna', 
  label: 'Laguna' },
  { value: 'oriental mindoro', 
  label: 'Oriental Mindoro' },
  { value: 'Isabela', 
  label: 'Isabela' },
  { value: 'north cotabato', 
  label: 'North Cotabato' },
  { value: 'misamis oriental', 
  label: 'Misamis Oriental' },
  { value: 'misamis oriental', 
  label: 'Misamis Oriental' },
];

const municipality = [
  { value: 'victoria', label: 'Victoria' },
  { value: 'los baños', label: 'Los Baños' },
  { value: 'jones', label: 'Jones' },
];

var cacaoIcon = L.icon({
    iconUrl: 'cacaomarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var bananaIcon = L.icon({
    iconUrl: 'bananamarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var cornIcon = L.icon({
    iconUrl: 'cornmarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var coffeeIcon = L.icon({
    iconUrl: 'coffeemarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var riceIcon = L.icon({
    iconUrl: 'ricemarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var soyIcon = L.icon({
    iconUrl: 'soybeanmarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var sugarCaneIcon = L.icon({
    iconUrl: 'sugarcanemarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

var tomatoIcon = L.icon({
    iconUrl: 'tomatomarker.png',
    iconSize: [55, 55],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41], 
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
});

const bananaID = '1UEUrcBZWiPYr3f0sOEpcaS5SjpaFO1Dm7e2l47uOaRg';
const cornID = '1TGbBxufMVRBCGUpNvOTZN9cV6qOGiQaP3FiQD1187FA';
const cacaoID = '1OfAOQjibxGUTyPPAcgQ7tQX1rx_f2zsXK_MANy97Hq0';
const riceID = '1ytQ4eaRntQakcKyStP7_i1oAWjgqpTCimOY_HZ_CGrE';
const soybeanID = '1e4uZzHWHwTsKuR13Sc2Ezh_eA0ecvHKTNeQCgCHfl2Q';
const tomatoID = '1D9TS3yKL6laJCEGgD0zTMGVns0FRjQ3q2mEd_t91fNU';
const sugarCaneID = '1KXrAjUrXJ2oYCd7gC5Pl06Z5gIhVxjIwxyuMT_Nsezw';
const coffeeID = '1v8XwFx6rF7dI1ZG_Fm76EPTSxz9hruOCS9feshvzOn4';
const allCropsID = '10-SwhJ1XueMHIJ_64eOQIFocBKXbeiYwLcp-SVVP62k';



class App extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.untoggleModal = this.untoggleModal.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.checkSoilProfile = this.checkSoilProfile.bind(this);
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
      dataSet: [],
      tableRows: [],
      modal: false,
      show: false,
      modalData: [],
      crop: null,
      pH: null,
      om: null,
      nitrogen: null,
      phosphorus: null,
      pAnalysis: null,
      potassium: null,
      texturalGrade: null,
      remarks: null,
      collaborator: null,
      barangay: null,
      municipality: null,
      province: null,
      latitude: null,
      longitude: null,
      dateSampled: null,
      soilProfile: null,
      provinceList: [],
      markers: [],
      googleSheetID: null,
      setBoolean: false,
      pdfText: null,
      soilPdf: null,
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
  }

  componentWillUnmount() {
    Tabletop.init({
      key: this.state.googleSheetID,
      callback: googleData => {
        console.log(googleData)
        this.setState({
          tableRows: googleData.map((post) => {
            return (
              { 
                button: <div>

                        <div>
                        
                        <button id = "button_toggle" onClick={() => this.toggleModal(post)} >
                        <FontAwesome
                          className='fas fa-plus'
                        />
                        </button>
                        </div>
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
          }),
          provinceList: googleData.map((post) => {
            return (
              
                { 
                value: post.province, label: post.province 
                }
              
            )
          }),
          markers: googleData.map((post) => {
            return (
              {
                key: post.id,
                position: [post.latitude, post.longitude],
                content:

                        <div>
                        Province: {post.province}
                        <br /> 
                        Crop: {post.crop}
                        <br />
                        pH: {post.pH}
                        <br/> 
                        <button onClick={() => this.toggleModal(post)} >
                        See more
                        </button>
                        </div>
                        ,
                  icon: this.changeIcon(post),

              }
            )
          }),
        })
      },
      simpleSheet: true
    })
  }


  componentDidUpdate() {
    Tabletop.init({
      key: this.state.googleSheetID,
      callback: googleData => {
        console.log(googleData)
        this.setState({
          tableRows: googleData.map((post) => {
            return (
              { 
                button: <div>

                        <div>
                        
                        <button id = "button_toggle" onClick={() => this.toggleModal(post)} >
                        <FontAwesome
                          className='fas fa-plus'
                        />
                        </button>
                        </div>
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
          }),
          provinceList: googleData.map((post) => {
            return (
              
                { 
                value: post.province, label: post.province 
                }
              
            )
          }),
          markers: googleData.map((post) => {
            return (
              {
                key: post.id,
                position: [post.latitude, post.longitude],
                content:

                        <div>
                        Province: {post.province}
                        <br /> 
                        Crop: {post.crop}
                        <br />
                        pH: {post.pH}
                        <br/> 
                        <button onClick={() => this.toggleModal(post)} >
                        See more
                        </button>
                        </div>
                        ,
                  icon: this.changeIcon(post),

              }
            )
          }),
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

  changeIcon(post) {
    var cropIcon;
    if (post.crop === "Banana"){
      cropIcon = bananaIcon;
    }
    else if (post.crop === "Cacao"){
      cropIcon = cacaoIcon;
    }
    else if (post.crop === "Coffee"){
      cropIcon = coffeeIcon;
    }
    else if (post.crop === "Corn"){
      cropIcon = cornIcon;
    }
    else if (post.crop === "Rice"){
      cropIcon = riceIcon;
    }
    else if (post.crop === "Tomato"){
      cropIcon = tomatoIcon;
    }
    else if (post.crop === "Sugarcane"){
      cropIcon = sugarCaneIcon;
    }

    else if (post.crop === "Soybean"){
      cropIcon = soyIcon;
    }
    return cropIcon
  }

  handleClose() {
    this.setState({ show: false });
  }

  toggleModal(post) {
    this.setState({
      modal: !this.state.modal,
      crop: post.crop,
      pH: post.pH,
      om: post.om,
      nitrogen: post.nitrogen,
      phosphorus: post.phosphorus,
      pAnalysis: post.pAnalysis,
      potassium: post.potassium,
      texturalGrade: post.texturalGrade,
      remarks: post.remarks,
      collaborator: post.collaborator,
      barangay: post.barangay,
      municipality: post.municipality,
      province: post.province,
      latitude: post.latitude,
      longitude: post.longitude,
      dateSampled: post.dateSampled,
      soilProfile: post.soilProfile,
    });

    
  }

  untoggleModal() {
    this.setState({
      modal: !this.state.modal,
     
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
    this.setState({ 
      selectedOption, 
    });
    
    //console.log(googleSheetID),
    console.log(`Option selected:`, selectedOption.value);
  }

  toggleSearch() {
    if (this.state.selectedOption.value === 'banana'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: bananaID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'cacao'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: cacaoID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'coffee'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: coffeeID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'corn'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: cornID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'rice'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: riceID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'sugarcane'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: sugarCaneID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'soya'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: soybeanID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'tomato'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: tomatoID,
        })
      }, 2000);
    }
    else if (this.state.selectedOption.value === 'all'){
      setTimeout(() => {
        this.setState({
        googleSheetID: '',
        })
      }, 100);
      setTimeout(() => {
        this.setState({
        googleSheetID: allCropsID,
        })
      }, 2000);
    }

    alert(this.state.soilProfile);
    console.log(this.state.soilProfile);
    
    console.log(this.state.selectedOption.value)
  }

  checkSoilProfile(){
    if (this.state.soilProfile === null) {
      this.setState({
        pdfText: <b>None</b>,
      })
    }
    else {
      this.setState({
        pdfText: <b>Download PDF</b>,
      })
    }
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
    const {open} = this.state;

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
          label: 'Organic Matter (OM)',
          field: 'om',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Nitrogen (N)',
          field: 'nitrogen',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Phosphorus (P)',
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
          label: 'Potassium (K)',
          field: 'potassium',
          sort: 'asc',
          width: 270
        },
      ],
      rows: this.state.tableRows
    };

    const modalSheet = {
      crop: this.state.crop,
      pH: this.state.pH,
      om: this.state.om,
      nitrogen: this.state.nitrogen,
      phosphorus: this.state.phosphorus,
      pAnalysis: this.state.pAnalysis,
      potassium: this.state.potassium,
      texturalGrade: this.state.texturalGrade,
      remarks: this.state.remarks,
      collaborator: this.state.collaborator,
      barangay: this.state.barangay,
      municipality: this.state.municipality,
      province: this.state.province,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      dateSampled: this.state.dateSampled,
      soilProfile: this.state.soilProfile,
    };

    const pList = this.state.provinceList;
    const mList = this.state.markersList;

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
            
           
          <ZoomControl position="bottomleft" />
          
          <MyMarkersList markers={this.state.markers} />
        </Map>

        <Collapse isOpen={this.state.collapseCard}>
        <div className="card-bounds">
        <Draggable bounds="parent">
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
          <CardText>Select Crop</CardText>
          <Form onSubmit={this.formSubmitted}>
            <FormGroup row>
              <Label for="exampleSelect"></Label>
              <Col sm={10}>
                <Select 
                value={selectedOption} 
                onChange={this.dropDownChange} 
                options={options}/>
              </Col>
            </FormGroup>
            <Button type="submit" color="info" onClick={this.toggleSearch}>Search</Button> {' '}
          </Form>
          </Card>
          
        </Draggable>
        </div>
        </Collapse>

        <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBDataTable  striped bordered hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} 
              data={dataSheet} sorting={false}
            />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        </MDBRow>

        <MDBModal id="modal_1" isOpen={this.state.modal} toggle={this.toggleModal} centered>
          <MDBModalHeader toggle={this.toggleModal}><img class="sarai-modal" src="header_green.png"/><img class="soils-modal" src="SoilsCardTitle.png"/></MDBModalHeader>
          <MDBModalBody>
             <b>Date Sampled:</b> {modalSheet.dateSampled}  &nbsp; &nbsp; <b>Coordinates: </b> {modalSheet.latitude}N , {modalSheet.longitude}E
             <br/>
             <b>Province:</b> {modalSheet.province}
             <br/>
             <b>Municipality</b> {modalSheet.municipality}
             <br/>
             <b>Barangay</b> {modalSheet.barangay}
             <br/>
             <b>Crop:</b> {modalSheet.crop}
             <br/>
             <b>pH:</b> {modalSheet.pH}
             <br/>
             <b>Organic Matter (OM):</b> {modalSheet.om}
             <br/>
             <b>Nitrogen: </b> {modalSheet.nitrogen}
             <br/>
             <b>Phosphorus:</b> {modalSheet.phosphorus}
             <br/>
             <b>P Analysis:</b> {modalSheet.pAnalysis}
             <br/>
             <b>Potassium:</b> {modalSheet.potassium}
             <br/>
             <b>Textural Grade:</b> {modalSheet.texturalGrade}
             <br/>
             <b>Remarks:</b> {modalSheet.remarks}
             <br/>
             <b>Soil Profile Series:</b> <a href={modalSheet.soilProfile}>Download Soil Profile</a>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.untoggleModal}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    )
  }
  
}

export default App;
