import { Card, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  {
    field: "value",
    headerName: "Valor",
    flex: 1,
    type: "number",
    editable: true,
  },
];

export default function TableTierList({ players }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
      <Box sx={{ width: "50%" }}>
        <DataGrid
          rows={players}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Card>
  );
}
