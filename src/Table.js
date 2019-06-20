import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {AutoSizer, Column} from 'react-virtualized';




class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles()(MuiVirtualizedTable);




const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.type.white,
    },
  },
}))(TableRow);

function createData(crop: any, pH: any, organicMatter: any, nitrogen: any, phosphorus: any, pAnalysis: any, potassium: any, texturalGrade: any, remarks: any, collaborator: any, barangay: any, municipality: any, province: any, latitude: any, longitude: any, dateSampled: any) {
  return { crop, pH, organicMatter, nitrogen, phosphorus, pAnalysis, potassium, texturalGrade, remarks, collaborator, barangay, municipality, province, latitude, longitude, dateSampled };
}

const rows = [
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),
  createData('Banana', 'Moderately acidic', 'medium', 'medium', 'low', 'Bray', 'high', 'Silt Loam', 'Highly Suitable for Banana', 'Mindoro State College of Agriculture and Technology (MinSCAT)', 'Alcate', 'Victoria', 'Oriental Mindoro', '13.1554', '121.1888', 'October 2, 2018'),

];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function DenseTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Crop</StyledTableCell>
            <StyledTableCell align="right">pH</StyledTableCell>
            <StyledTableCell align="right">Organic Matter (OM)&nbsp;%</StyledTableCell>
            <StyledTableCell align="right">Nitrogen (N) %&nbsp;%</StyledTableCell>
            <StyledTableCell align="right">Phosphorus (P)  &nbsp;ppm</StyledTableCell>
            <StyledTableCell align="right">P Analysis &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Potassium (K)  &nbsp;(cmolc/kg soil)</StyledTableCell>
            <StyledTableCell align="right">Textural Grade &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Remarks / Soil Fertility Constraint &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Collaborator &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Barangay &nbsp;</StyledTableCell>
             <StyledTableCell align="right">Municipality &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Province &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Latitude (N) &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Longitude (E) &nbsp;</StyledTableCell>
            <StyledTableCell align="right">Date Sampled &nbsp;</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.crop}>
              <StyledTableCell component="th" scope="row">
                {row.crop}
              </StyledTableCell>
              <StyledTableCell align="right">{row.pH}</StyledTableCell>
              <StyledTableCell align="right">{row.organicMatter}</StyledTableCell>
              <StyledTableCell align="right">{row.nitrogen}</StyledTableCell>
              <StyledTableCell align="right">{row.phosphorus}</StyledTableCell>
              <StyledTableCell align="right">{row.pAnalysis}</StyledTableCell>
              <StyledTableCell align="right">{row.potassium}</StyledTableCell>
              <StyledTableCell align="right">{row.texturalGrade}</StyledTableCell>
              <StyledTableCell align="right">{row.remarks}</StyledTableCell>
              <StyledTableCell align="right">{row.collaborator}</StyledTableCell>
              <StyledTableCell align="right">{row.barangay}</StyledTableCell>
              <StyledTableCell align="right">{row.municipality}</StyledTableCell>
              <StyledTableCell align="right">{row.province}</StyledTableCell>
              <StyledTableCell align="right">{row.latitude}</StyledTableCell>
              <StyledTableCell align="right">{row.longitude}</StyledTableCell>
              <StyledTableCell align="right">{row.dateSampled}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
}