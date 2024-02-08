import "./App.css";
import { useState } from "react";
import TableTierList from "./components/TableTierlist";
import CalculateResult from "./components/CalculateResult";
import Title from "./components/Title";
import { Box } from "@mui/material";
const initialPlayers = [
  { id: 1, nombre: "Suchi", value: 2 },
  { id: 2, nombre: "Ari", value: 1.9 },
  { id: 3, nombre: "Kevin", value: 1.75 },
  // { id: 4, nombre: "Magic", value: 1.7 },
  { id: 5, nombre: "Añeñan", value: 1.5 },
  { id: 6, nombre: "Nico", value: 1.1 },
  { id: 7, nombre: "Agus", value: 1 },
  { id: 8, nombre: "Tomi", value: 0.85 },
  { id: 4, nombre: "bot", value: 0.7 },
  { id: 9, nombre: "Facu", value: 0.7 },
  { id: 10, nombre: "Erik", value: 0.4 },
];
//{ id: 10, nombre: "Bot", value: 0.7 },
//{ id: 11, nombre: "+ 1000 pesos para el team", value: 0.6 },

function App() {
  const [players, setPlayers] = useState(initialPlayers);

  const changePlayers = (newPlayers) => {
    setPlayers(newPlayers);
  };

  return (
    <div>
      <Title />
      <Box
        sx={{
          display: "flex",
          "@media(max-width: 700px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TableTierList players={players} setPlayers={changePlayers} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CalculateResult players={players} />
        </Box>
      </Box>
    </div>
  );
}

export default App;
