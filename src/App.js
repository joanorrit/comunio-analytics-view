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
import Modal from '@mui/material/Modal';

const API_ENDPOINT = 'http://127.0.0.1:4000/public/get-round-prediction/';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const laLigaPlayers = [
  {
    name: 'Karim Benzema',
    points: 34,
    objectID: 0,
  },
  {
    name: 'Lionel Messi',
    points: 5,
    objectID: 1,
  },
  {
    name: 'Sergio Busquets',
    points: 5,
    objectID: 2,
  },
  {
    name: 'Andres Iniesta',
    points: 54,
    objectID: 3,
  },
  {
    name: 'Carles Puyol',
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
  const [open, setOpen] = React.useState(false);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let roundPredictionArray = [];
  for (const [key, value] of Object.entries(roundPrediction)) {
    roundPredictionArray.push({
      'username': key,
      'score': value,
    });
  }

  return (
    <div>
      <h1 className="h1-title"> Comunio Prediction </h1>
      <Box sx={{ marginLeft: '200px', width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <List>
          {
            roundPredictionArray.map(
              (item) => {
                return (
                <>
                <ListItem>
                  <ListItemAvatar>
                    <button onClick={handleOpen} className="button-avatar" type="submit">
                      <img className="image-avatar" src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png" alt="buttonpng" border="0" />
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <input id="search" type="text"/>
                          <PlayersList list={laLigaPlayers}/>
                        </Box>
                      </Modal>
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

const PlayersList = (props) => {
  return (  
    <ul>
      {props.list.map(
        (item) => <Item key={item.objectID} item={item}/>
        )
      }
    </ul>
  );
};

const Item = ({item}) => {
  return (
    <>
    <li>
      <span>{item.name}</span>
    </li>
    </>
  );
};

export default App;
