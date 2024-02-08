import { useState } from "react";
import { Card, Box, Button } from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

function numeroAleatorio(min, max) {
  // Validar que min y max sean números
  if (isNaN(min) || isNaN(max)) {
    throw new Error("Los valores de min y max deben ser números");
  }

  // Validar que min sea menor o igual que max
  if (min > max) {
    throw new Error("El valor de min debe ser menor o igual que max");
  }

  // Generar un número aleatorio entre min y max (sin incluir max)
  const numero = Math.random() * (max - min) + min;

  // Devolver el número aleatorio como un entero
  return Math.floor(numero);
}

function EditToolbar(props) {
  const { setPlayers, setRowModesModel, players } = props;

  const handleClick = () => {
    const id = numeroAleatorio(100, 100000);
    setPlayers([...players, { id, nombre: "", value: 0, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "nombre" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar jugador
      </Button>
    </GridToolbarContainer>
  );
}

export default function TableTierList({ players, setPlayers }) {
  const [rows, setRows] = useState([
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
  ]);
  const [rowModesModel, setRowModesModel] = useState({});
  const columns = [
    { field: "nombre", headerName: "Nombre", flex: 1, editable: true },
    {
      field: "value",
      headerName: "Nivel de jugador",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setPlayers(players.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = players.find((row) => row.id === id);
    if (editedRow.isNew) {
      setPlayers(players.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setPlayers(players.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Set edit mode for new rows here:
    if (updatedRow.isNew) {
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [updatedRow.id]: { mode: GridRowModes.Edit, fieldToFocus: "nombre" },
      }));
    }

    return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
      <DataGrid
        rows={players}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setPlayers, setRowModesModel, players },
        }}
      />
    </Box>
  );
}
