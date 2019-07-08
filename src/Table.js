import React, {Component} from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'


const $ = require('jquery');
$.DataTable = require('datatables.net');



export class Table extends Component {
  
  format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>'+d.extn+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
  }


  componentDidMount() {
    console.log(this.el)
    this.$el = $(this.el)
    console.log(this.$el)
    this.$el.DataTable(
      {
        data: this.props.data,
        columns: [
          {title: "crop"},
          {title: "pH"},
          {title: "om"},
          {title: "nitrogen"},
          {title: "phosphorus"},
          {title: "pAnalysis"},
          {title: "potassium"},
          {title: "texturalGrade"},
          {title: "remarks"},
          {title: "collaborator"},
          {title: "barangay"},
          {title: "municipality"},
          {title: "province"},
          {title: "latitude"},
          {title: "longitude"},
          {title: "dateSampled"}, 
        ]
      }

    )
  } 

  componentWillUnmount(){

  }




  render(){
    return (
      <div>
        <table id="example" className="display" ref={el => this.el = el}>
        </table>
      </div>
    )
  }
}