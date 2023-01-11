import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const API_ENDPOINT = 'http://127.0.0.1:4000/public/get-round-prediction/';

const App = () => {
  const [roundPrediction, setRoundPrediction] = React.useState([])

  let currentRoundId = '3148';

  React.useEffect(() => {
    fetch(`${API_ENDPOINT}${currentRoundId}`).
      then((response) => response.json()).
      then(result => {
        setRoundPrediction(result);
    })
  }, []);

  let roundPredictionArray = [];
  for (const [key, value] of Object.entries(roundPrediction)) {
    roundPredictionArray.push({
      'username': key,
      'score': value,
    });
  }

  return (
    <div>
      <h1> La predicció de la jornada </h1>
      <Box sx={{ margin: '50px auto', width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <List>
          {
            roundPredictionArray.map(
              (item) => {
                return (
                <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://cdn.biwenger.com/icons/34.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.username}: ${item.score}`}
                  />
                </ListItem>
                </>
                )
              }
            )
          }
        </List>
      </Box>
    </div>
  );
}



export default App;
