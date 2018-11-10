import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Backup/BackupStyle.js";
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../components/AutoTable/AutoTable';
import data from '../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../components/Tab/OCBigTab.js';
import TabContainer from '../../components/Tab/TabContainer';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";

const labels = ['Akcje', 'Kopie przyrostowe', 'Kopie pełne'];

class Backup extends React.Component {
    state = {
        name: +new Date+'_backup',
        backupOption: 'full',
        backup: '1541881696928_backup',
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Kopie bezpieczeństwa
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
              <Typography variant="h5" gutterBottom component="h1">
                  Akcje
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="h1">
                  Utworzenie nowej kopii zapasowej
              </Typography>
              <div className={classes.flexForm}>
              <TextField
                  id="outlined-name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  variant="outlined"
                  fullWidth
              />
              <TextField
                  select
                  label="Rodzaj kopii"
                  className={classes.textField}
                  onChange={this.handleChange('backupOption')}
                  value={this.state.backupOption}
                  style={{minWidth: '10%'}}
              >
                  <MenuItem value='full'>
                          Pełna
                      </MenuItem>
                  <MenuItem value='incremental'>
                      Przyrostowa
                  </MenuItem>
              </TextField>
                  <Button variant="contained" color="primary" className={classes.button}>
                      Dodaj
                  </Button>
                  </div>
              <hr/>
              <Typography variant="subtitle1" gutterBottom component="h1">
                  Przywrócenie kopii zapasowej
              </Typography>
              <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
              <Typography variant="h5" gutterBottom component="h1">
                  Kopie przyrostowe
              </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
            <TabContainer>
                <Typography variant="h5" gutterBottom component="h1">
                    Kopie pełne
                </Typography>
                <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
            </TabContainer>
        </OCBigTab>
      </React.Fragment>
    );
  }
}

Backup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(Backup);
