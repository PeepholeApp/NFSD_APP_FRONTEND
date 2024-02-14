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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
    value: "PT",
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
  const [images, setImages] = useState([]);
  const { user, loading } = useAuth();
  const [file, setFile] = React.useState(null);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    if (user && !loading) {
      const loadProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/profiles/user/${user.profileId}`
          );
          const profile = response.data;

          const profileLanguages = profile.languages
            .map((lang) => {
              const languageOption = languagesOptions.find(
                (option) => option.value === lang
              );
              return languageOption;
            })
            /*
                filtrar los codigos de lenguages que no
                estan en el arreglo en caso de que en Mongo
                exista un codigo de lenguage desconocido
            */
            .filter((option) => !!option);

          setName(profile.name);
          setLastName(profile.last_name);
          setBirthday(new Date(profile.dob));
          setBio(profile.bio);
          setGenero(profile.gender);
          setNationality(profile.nationality);
          setLanguages(profileLanguages);
          setImages(profile.photo);
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

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log("que es esto", formData);
    const files = e.target.files;
    console.log(e.target.files);
    //Toma todos los archivos e itera y agrega al formData
    for (let file of files) {
      formData.append("file", file);
    }

    const response = await axios.post("http://localhost:3001/image", formData);
    console.log(response.data);
    setImages(response.data);
  };

  const onSaveModify = async () => {
    const response = await axios.put(
      `http://localhost:3001/profiles/${user.profileId}`,
      {
        name,
        last_name: lastName,
        dob: birthday.toISOString(),
        gender: genero,
        nationality,
        languages: languages.map((language) => language.value),
        bio,
        photo: images,
        user: user.userId,
      }
    );
  };

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const onImageDelete = (index) => () => {
    setImages((images) =>
      images.filter((_image, imageIndex) => imageIndex != index)
    );
  };
  return (
    <Stack sx={{ m: 5 }} alignItems="center">
      <Stack sx={{ p: 8, width: 600, backgroundColor: "#262938" }} spacing={2}>
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            width: 50,
            height: 50,
            alignSelf: "center",
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
            onChange={(e, option) => {
              setLanguages(option);
            }}
            multiple
            options={languagesOptions}
            renderInput={(params) => <TextField {...params} label="Idioma" />}
          />
        </FormControl>
        <FormControl></FormControl>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleUpload} />
        </Button>
        <Stack direction="row">
          {images &&
            images.map((url, index) => (
              <Stack sx={{ "& button": { m: 1 } }}>
                <img
                  key={url}
                  width={200}
                  height={200}
                  src={url}
                  style={{ objectFit: "cover" }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  size="small"
                  onClick={onImageDelete(index)}
                >
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Button>
              </Stack>
            ))}
        </Stack>

        <ButtonDark onClick={onSaveModify}>Guardar Cambios</ButtonDark>
      </Stack>
    </Stack>
  );
};
export default EditProfile;
