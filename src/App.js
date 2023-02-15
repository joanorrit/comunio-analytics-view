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

const API_ENDPOINT = 'http://127.0.0.1:4000/public/get-predicted-players/';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialLineUp = () => {
  let lineUp = [];
  for (let i=0; i<11; i++) {
    lineUp[i] = {
      name: 'Click image to add player!',
      biwengerid: null,
      five_avg: 0,
    };
  }
  return lineUp;
}

const App = () => {
  const [laLigaPlayers, setLaLigaPlayers] = React.useState([])
  const [points, setPoints] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [lineUp, setLineUp] = React.useState(initialLineUp());
  const [currentButtonClicked, setCurrentButtonClicked] = React.useState(0);

  React.useEffect(() => {
    fetch(`${API_ENDPOINT}`).
      then((response) => response.json()).
      then(result => {
        setLaLigaPlayers(result);
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

    let playerBeingChanged = newLineUp[currentButtonClicked];

    let pointsPlayerBeingChanged = playerBeingChanged.five_avg;

    newLineUp[currentButtonClicked] = {
      name: item.name,
      biwengerid: item.biwengerid,
      five_avg: item.five_avg,
    };

    setPoints(points - pointsPlayerBeingChanged + item.five_avg);

    setLineUp(newLineUp);

    setOpen(false);
  };

  const searchedPlayers = laLigaPlayers.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlayerImage = (index) => {
    let image = 'https://cdn-icons-png.flaticon.com/128/3237/3237472.png';
    const player = lineUp[index];
    if (player.biwengerid != null) {
      image = 'https://cdn.biwenger.com/i/p/' + player.biwengerid + '.png';
    }

    return image;
  }

  return (
    <div>
      <h1 className="h1-title"> Predicción Comunio </h1>
      <Box sx={{ flexGrow: 1, marginLeft: '100px', width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <Grid item xs={10}>
          <List>
            {
              lineUp.map(
                (item, index) => {
                  return (
                  <>
                  <ListItem>
                    <ListItemAvatar>
                      <button onClick={handleOpen} className="button-avatar" type="submit">
                        <img id={index} className="image-avatar" src={getPlayerImage(index)} alt="buttonpng" border="0" />
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
        </Grid>
        <Grid item xs={2}>
          <span className="total-points-span">{points}</span>
        </Grid>
      </Grid>
      </Box>
    </div>
  );
}

const PlayersList = (props) => {
  return (  
    <ul>
      {props.list.slice(0,10).map(
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
