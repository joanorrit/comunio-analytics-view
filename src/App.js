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

const laLigaPlayers = [
  {
    name: 'Karim Benzema',
    points: 34,
    objectID: 0,
  },
  {
    title: 'Lionel Messi',
    points: 5,
    objectID: 1,
  },
  {
    title: 'Sergio Busquets',
    points: 5,
    objectID: 2,
  },
  {
    title: 'Andres Iniesta',
    points: 54,
    objectID: 3,
  },
  {
    title: 'Carles Puyol',
    points: 82,
    objectID: 10,
  },
];

const getAsynStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: laLigaPlayers } }),
      2000
    )
  );

const App = () => {
  const [roundPrediction, setRoundPrediction] = React.useState([])
  const [laLigaPlayers, setLaLigaPlayers] = React.useState([])

  let currentRoundId = '3156';

  React.useEffect(() => {
    getAsynStories().then(result => {
      setLaLigaPlayers(result.data.stories);
    })
  }, []);

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
                    <button class="button-avatar" type="submit">
                      <img class="image-avatar" src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png" alt="buttonpng" border="0" />
                    </button>
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
