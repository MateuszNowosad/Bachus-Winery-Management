import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MediaCardStyle from '../../assets/jss/common/components/MediaCardStyle';
import SimpleRadialBarChart from '../../variables/AdminDashboard/ExampleRadialBarChart';
import { Link } from 'react-router-dom';

class MediaCard extends React.Component {
  MyLink = props => {
    return <Link to={'/admindashboard/productionplans/' + this.props.id} {...props} />;
  };

  render() {
    const { classes, heading, contents } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea component={this.MyLink}>
          {/*<SimpleRadialBarChart />*/}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {heading}
            </Typography>
            <Typography component="p">{contents}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(MediaCardStyle)(MediaCard);
