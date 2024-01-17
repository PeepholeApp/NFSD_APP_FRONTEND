import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [genero, setGenero] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ m: 8 }}>
      <Stack
        component="form"
        autoComplete="off"
        sx={{ width: 500 }}
        spacing={2}
      >
        <TextField
          id="filled-basic"
          label="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          id="filled-basic"
          label="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <Stack direction="row">
          {/* <Typography variant="body1">Fecha de Nacimiento</Typography> */}
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ paddingRight: 2 }}
          >
            Fecha de Nacimiento
          </FormLabel>
          <DatePicker />
        </Stack>

        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value);
            }}
          >
            Genero
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Femenino"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Masculino"
            />
            <FormControlLabel value="other" control={<Radio />} label="Otro" />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Nacionalidad</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={nationality}
            label="nationality"
            onChange={handleChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={10}>Argentino</MenuItem>
            <MenuItem value={20}>Colombiano</MenuItem>
            <MenuItem value={20}>Madrileño</MenuItem>
            <MenuItem value={30}>Venezolano</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Idioma</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // value={language}
            label="language"
            onChange={handleChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={10}>Español</MenuItem>
            <MenuItem value={20}>Ingles</MenuItem>
            <MenuItem value={20}>Portugues</MenuItem>
            <MenuItem value={30}>Frances</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};
export default Profile;
