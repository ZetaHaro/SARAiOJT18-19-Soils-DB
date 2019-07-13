import React, {Component} from 'react';

class BananaMarkers extends Component {
  render(){
    return (
      <div>
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
      </div>
    )
  }
}

export default BananaMarkers;