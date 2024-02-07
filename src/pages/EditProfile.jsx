import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FormControl, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import { useAuth } from "../context/Login";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { ButtonDark } from "../components/Button";

const languagesOptions = [
  {
    label: "Español",
    value: "ES",
  },
  {
    label: "Ingles",
    value: "EN",
  },
  {
    label: "Frances",
    value: "FR",
  },
  {
    label: "Portugues",
    value: "PR",
  },
  {
    label: "Italiano",
    value: "IT",
  },
];

const EditProfile = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [nationality, setNationality] = useState("");
  const [genero, setGenero] = useState("");
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("");
  const [countries, setCountries] = useState([]);

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      const loadProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/profiles/user/${user.profileId}`
          );
          const profile = response.data;
          setName(profile.name);
          setLastName(profile.last_name);
          setBirthday(new Date(profile.dob));
          setBio(profile.bio);
          setGenero(profile.gender);
          setNationality(profile.nationality);
          setLanguages(profile.languages);
        } catch (error) {
          console.error(error);
        }
      };
      loadProfile();
    }
  }, [loading, user]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countries = response.data
        .map((country) => {
          return {
            label: country.name.common,
            value: country.cca2,
          };
        })
        .sort((countryA, countryB) => {
          return countryA.label.localeCompare(countryB.label);
        });
      setCountries(countries);
    });
  }, []);

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
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Stack>
        <Stack direction="row">
          <FormLabel sx={{ paddingRight: 2 }}>Fecha de Nacimiento</FormLabel>
          <DatePicker
            value={birthday}
            onChange={(e) => {
              setBrithday(e.target.value);
            }}
          />
        </Stack>
        <TextField
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          fullWidth
        />

        <FormControl>
          <FormLabel>Genero</FormLabel>
          <RadioGroup
            row
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value);
            }}
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
          <InputLabel>Nacionalidad</InputLabel>
          <Select
            value={nationality}
            label="nationality"
            onChange={(e) => {
              setNationality(e.target.value);
            }}
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Autocomplete
            value={languages}
            onChange={(e, value) => {
              setLanguages(value);
            }}
            multiple
            options={languagesOptions}
            renderInput={(params) => <TextField {...params} label="Idioma" />}
          />
        </FormControl>
        <ButtonDark>Guardar Cambios</ButtonDark>
      </Stack>
    </Stack>
  );
};
export default EditProfile;
