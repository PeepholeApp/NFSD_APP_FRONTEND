import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FormControl, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/Login";

const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.mode === "dark";
};

const EditProfile = () => {
  const [brithday, setBrithday] = useState(new Date());
  const [name, setName] = useState("");

  const { user, loading } = useAuth();

  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (user && !loading) {
      const loadProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/profiles/user/${user.profileId}`
          );
          const profile = response.data;
          setName(profile.name);
        } catch (error) {
          console.error(error);
        }
      };
      loadProfile();
    }
  }, [loading, user]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Stack sx={{ m: 5 }} alignItems="center">
      <Stack sx={{ p: 8, width: 600, backgroundColor: "#262938" }} spacing={2}>
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            width: 50,
            height: 50,
          }}
          variant="square"
        >
          P
        </Avatar>
        <Stack direction="row" spacing={2}>
          <TextField value={name} onChange={onNameChange} />

          <TextField label="Last name" />
        </Stack>
        <Stack direction="row">
          <FormLabel sx={{ paddingRight: 2 }}>Fecha de Nacimiento</FormLabel>
          <DatePicker value={brithday} />
        </Stack>
        <TextField fullWidth label="Añade una Biografía sobre ti" />
        <Stack>
          <Icon
            sx={{ ...(isDarkMode && { filter: "invert(1)" }) }}
            baseClassName="material-icons-two-tone"
          >
            +
          </Icon>
        </Stack>

        {/* <FormControl>
          <FormLabel>Genero</FormLabel>
          <RadioGroup row value={genero}>
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
        </FormControl> */}
      </Stack>
    </Stack>
  );
};
export default EditProfile;
