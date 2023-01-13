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

const icons = {
  "Canet Post-Messiah": "https://cdn.biwenger.com/img/user.svg",
  "Jabatos team": "https://cdn.biwenger.com/img/user.svg",
  "Medu": "https://cdn.biwenger.com/img/user.svg",
  "Politzs": "https://cdn.biwenger.com/icons/29.png",
  "UE Mero": "https://cdn.biwenger.com/img/user.svg",
  "BLACK PANTHERS MATTER": "https://cdn.biwenger.com/icons/31.png",
  "FC Robertlona": "https://cdn.biwenger.com/i/u/6921178.png",
  "Lexus": "https://cdn.biwenger.com/i/u/6911458.png",
  "Real Zamesta": "https://cdn.biwenger.com/icons/32.png",
  "Simoncelli Jr.": "https://cdn.biwenger.com/img/user.svg",
};

const App = () => {
  const [roundPrediction, setRoundPrediction] = React.useState([])

  let currentRoundId = '3152';

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
                    <Avatar alt="Remy Sharp" src={icons[item.username]} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.username === 'msg' ? 'Wait!' : item.username}: ${item.score}`}
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
