import * as React from 'react';

const API_ENDPOINT = '127.0.0.1:80/public/get-top-players';

function App() {
  const [roundPrediction, setRoundPrediction] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:80/public/get-round-prediction/3148').
      then((response) => response.json()).
      then(result => {
        setRoundPrediction(result);
    })
  }, []);

  return (
    <div>
      {JSON.stringify(roundPrediction)}
    </div>
  );
}

export default App;
