import React, {useState,useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom"

export default function About() {
    return (
        <React.Fragment>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h3"
                  variant="h3"
                  align="center"
                  color="textPrimary"
                  gutterBottom>
                  New Arrivals
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph>
                  Buy our cool products and be cool as f*ck
                </Typography>
              </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4} styles={{maxWidth: "50%", flexBasis: "50%"}}>
                {items.map(item => (                              
                  <Grid item key= {item.product_id} xs={12} sm={6} md={4}>
                    <Link to = {`/product/${item.product_id}`} variant="body2" className={classes.link}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image= {item.img}
                        title="Image title" />
                        <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {item.product_name}
                        </Typography>
                        <Typography>
                         Price: {item.price} $
                        </Typography>
                        <Typography>
                        Brand:{item.brand_name}
                        </Typography>
                        <Typography>
                        Rating: {item.rating}/5
                        </Typography>
                        </CardContent>
                    </Card>
                  </Link>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
    
        </React.Fragment>
      );
    }
  );
}


