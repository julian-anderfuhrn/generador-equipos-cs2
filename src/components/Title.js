import { Box, Typography } from "@mui/material";

export default function Title() {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Armador de equipos
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        Armador de 2 equipos, emparejando segun el nivel de cada jugador
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <b>*El numero de jugadores debe ser par</b>
      </Typography>
      <Typography variant="body2">
        <b>
          *Cuando se modifica un jugador los nuevos valores se almacenan en el
          navegador
        </b>
      </Typography>
    </Box>
  );
}
