import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import B from './images/beste.jpg';
import S from './images/seray.jpg';
import C from './images/ceyda.jpg';
import O from './images/ozan.jpg';
import I from './images/ilgin.jpg';
import On from './images/onat.jpg';


const activeCore = [
  {
    name: 'Aleyna Beste Özhan',
    email: 'aleynabeste@sabanciuniv.edu',
    flag: 'DB Designer, Front-end Developer',
    location: 'Corum, Turkey',
    img: B,
  },
  {
    name: 'Seray Ayakta',
    email: 'serayayakta@sabanciuniv.edu',
    flag: 'DB Designer, Front-end Developer',
    location: 'Manisa, Turkey',
    img:  S
  },
  {
    name: 'Çiğdem Ceyda Düzgeç',
    email: 'cduzgec@sabanciuniv.edu ',
    flag: 'Front-end Developer',
    location: 'Istanbul, Turkey',
    img:  C,
  },
  {
    name: 'Mustafa Ozan Yıldırım',
    email: 'oyildirim@sabanciuniv.edu ',
    flag: 'DB Designer, Back-end Developer',
    location: 'Mersin, Turkey',
    img:  O,
  },
  {
    name: 'Onat Kutlu',
    email: 'onatkutlu@sabanciuniv.edu ',
    flag: 'Back-end Developer',
    location: 'Istanbul, Turkey',
    img:  On,
  },
  {
    name: 'Ilgın Sara Hacipoğlu',
    email: 'ilginsara@sabanciuniv.edu ',
    flag: 'Front-end Developer',
    location: 'Istanbul, Turkey',
    img:  I,
  },

];



const styles = (theme) => ({
  details: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  cover: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2),
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    fontSize: 18,
    padding: theme.spacing(1),
  },
  container: {
    margin: theme.spacing(2, 0, 4),
  },
});

function Group(props) {
  const { title, description, classes, members } = props;
  return (
    <div>
      <Typography gutterBottom component="h2" variant="h5">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Grid container spacing={2} className={classes.container}>
        {members.map((member) => (
          <Grid key={member.name} item xs={12} md={6}>
            <Paper variant="outlined">
              <Grid container wrap="nowrap">
                <Grid item>
                  <CardMedia
                    className={classes.cover}
                    image={member.img}
                    title="Avatar"
                  />
                </Grid>
                <Grid item>
                  <div className={classes.details}>
                    <Typography component="h3" variant="h6">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.flag}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.location}
                    </Typography>
                    <Typography style={{ textTransform: 'lowercase'}} variant="body2" color="textSecondary">
                      {member.email}
                    </Typography>
    
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

function Team(props) {
  return (
    <div>
      <Group
        title="Team 14"
        description={`The development of the project and its ecosystem is
        guided by this awesome team`}
        members={activeCore}
        {...props}
      />

    </div>
  );
}

export default withStyles(styles)(Team);