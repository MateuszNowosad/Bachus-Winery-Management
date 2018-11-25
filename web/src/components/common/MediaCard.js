import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MediaCardStyle from "../../assets/jss/common/components/MediaCardStyle";

function MediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image="https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg"
                    title="Kitty cat"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lorem
                    </Typography>
                    <Typography component="p">
                        Lorem ipsum
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(MediaCardStyle)(MediaCard);