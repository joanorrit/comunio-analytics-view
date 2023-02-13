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

const initialLineUp = () => {
  let lineUp = [];
  for (let i=0; i<11; i++) {
    lineUp[i] = {
      name: 'Click image to add your player!',
    };
  }
  return lineUp;
}

const getAsynStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { players: laLigaPlayers } }),
      2000
    )
  );

const App = () => {
  const [roundPrediction, setRoundPrediction] = React.useState([])
  const [laLigaPlayers, setLaLigaPlayers] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [lineUp, setLineUp] = React.useState(initialLineUp());
  const [currentButtonClicked, setCurrentButtonClicked] = React.useState(0);

  let currentRoundId = '3156';
  

  React.useEffect(() => {
    getAsynStories().then(result => {
      setLaLigaPlayers(result.data.players);
    })
  }, []);

  React.useEffect(() => {
    fetch(`${API_ENDPOINT}${currentRoundId}`).
      then((response) => response.json()).
      then(result => {
        setRoundPrediction(result);
    })
  }, []);

  const handleOpen = (event) => {
    setOpen(true);
    setCurrentButtonClicked(event.target.id);
  }
  const handleClose = () => {
    setSearchTerm('');
    setOpen(false);
  }
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleLineUpUpdate = (item) => {
    let newLineUp = lineUp;
    console.log(currentButtonClicked);
    newLineUp[currentButtonClicked] = {
      name: item.name
    };
    setLineUp(newLineUp);
    setOpen(false);
  };

  let roundPredictionArray = [];
  for (const [key, value] of Object.entries(roundPrediction)) {
    roundPredictionArray.push({
      'username': key,
      'score': value,
    });
  }

  const searchedPlayers = laLigaPlayers.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="h1-title"> Predicción Comunio </h1>
      <Box sx={{ marginLeft: '200px', width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <List>
          {
            lineUp.map(
              (item, index) => {
                return (
                <>
                <ListItem>
                  <ListItemAvatar>
                    <button onClick={handleOpen} className="button-avatar" type="submit">
                      <img id={index} className="image-avatar" src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png" alt="buttonpng" border="0" />
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <input id="search" onChange={handleSearch} type="text"/>
                        <PlayersList list={searchedPlayers} handleLineUpUpdate={handleLineUpUpdate}/>
                      </Box>
                    </Modal>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
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
        (item) => <Item key={item.objectID} item={item} lineUpPosition={props.lineUpPosition} handleLineUpUpdate={props.handleLineUpUpdate}/>
        )
      }
    </ul>
  );
};

const Item = ({item, lineUpPosition, handleLineUpUpdate}) => {
  return (
    <>
    <li>
      <span>{item.name}</span>
      <button id={item.objectID} onClick={() => handleLineUpUpdate(item)}>Select</button>
    </li>
    </>
  );
};

export default App;
