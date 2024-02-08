import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";

export default function CalculateResult({ players }) {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState(null);
  const [diffMax, setDiffMax] = useState(0.4);

  const calcularEquipos = () => {
    if (typeof calculateRandomTeamCombination(players) === "string") {
      setError(
        "El numero de jugadores es impar o no se encuentran combinaciones con esa diferencia maxima"
      );
      setEquipos([]);
    } else {
      setError(null);
      setEquipos(calculateRandomTeamCombination(players));
    }
  };

  const handleDiffMaxChange = (event) => {
    const newDiffMax = event.target.value;
    setDiffMax(newDiffMax);
  };

  function combinations(array, size) {
    const result = [];
    const f = function (prefix = [], array) {
      for (let i = 0; i < array.length; i++) {
        result.push(prefix.concat(array[i]));
        f(prefix.concat(array[i]), array.slice(i + 1));
      }
    };
    f([], array);
    return result.filter((arr) => arr.length === size);
  }

  function calculateRandomTeamCombination(players) {
    const allCombinations = combinations(players, players.length / 2);
    const validCombinations = allCombinations.filter((combination) => {
      const sum1 = combination.reduce((acc, player) => acc + player.value, 0);
      const sum2 =
        players.reduce((acc, player) => acc + player.value, 0) - sum1;
      return Math.abs(sum1.toFixed(3) - sum2.toFixed(3)) <= diffMax;
    });

    if (validCombinations.length === 0) {
      return "No hay combinaciones válidas";
    }

    const randomIndex = Math.floor(Math.random() * validCombinations.length);
    const randomCombination = validCombinations[randomIndex];
    const team1 = randomCombination;
    const team2 = players.filter(
      (player) => !randomCombination.includes(player)
    );

    return [team1, team2];
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 3,
      }}
    >
      <TextField
        label="Diferencia maxima entre equipos"
        type="number"
        sx={{ mb: 2 }}
        value={diffMax}
        onChange={handleDiffMaxChange}
        inputProps={{
          step: 0.01,
        }}
      />
      <Button variant="contained" onClick={calcularEquipos}>
        Armar equipos
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
        {error && <Typography>{error}</Typography>}
        {equipos.length > 0 && (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">Equipo 1</Typography>
              {equipos[0]?.map((element, index) => (
                <Typography key={index}>{element.nombre}</Typography>
              ))}
              <Typography variant="body2">
                Valor total:{" "}
                {equipos[0]
                  ?.reduce((acum, element) => {
                    return acum + element.value;
                  }, 0)
                  .toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">Equipo 2</Typography>
              {equipos[1]?.map((element, index) => (
                <Typography key={index}>{element.nombre}</Typography>
              ))}
              <Typography variant="body2">
                Valor total:{" "}
                {equipos[1]
                  ?.reduce((acum, element) => {
                    return acum + element.value;
                  }, 0)
                  .toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
