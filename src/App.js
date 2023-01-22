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
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';

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

  let currentRoundId = '3153';

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
    <div class="div-general-wrapper">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">Comunio Analytics</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Predicció</Nav.Link>
              <Nav.Link href="#pricing">Hot Players</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      <h1 class="title-prediction"> La predicció de la jornada </h1>
      <Box sx={{ margin: '10px auto', width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
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
