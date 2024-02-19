import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useAuth } from "../context/Login";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Interests from "../data/interests.json";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ButtonDark } from "../components/Button";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import UploadPhotos from "../components/UploadPhotos";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  textAlign: "center",
}));

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

const Profile = ({}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brithday, setBrithday] = useState(new Date());
  const [nationality, setNationality] = useState("");
  const [genero, setGenero] = useState("");
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("");
  const [step, setStep] = useState(0);
  const [countries, setCountries] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    //chekeo si existe usuario y este cargado
    if (!user?.token && !loading) {
      navigate("/login");
    }
  }, [user, loading]);

  const onNext = async () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  //se utilizo el Set js para almacenar los intereses selecionados
  const onSelectInterest = (interest) => {
    setSelectedInterests((selectedInterests) => {
      const selected = new Set(selectedInterests);
      if (selected.has(interest)) {
        //el método has --> verifica si existe o no el interest
        selected.delete(interest);
        return selected;
      } else {
        selected.add(interest);
        return selected;
      }
    });
  };

  const handleClose = () => setOpen(false);

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

    setUploading(true);
    const response = await axios.post("http://localhost:3001/image", formData);
    console.log(response.data);
    setImage(response.data);
    setUploading(false);
  };

  const hadleImageSelected = (e) => {
    const image = e.target.files[0];
    setFile(image);
    console.log(image);
  };
  const onImageDelete = (index) => () => {
    setImage((images) =>
      images.filter((_image, imageIndex) => imageIndex != index)
    );
  };

  const onSave = async () => {
    const interests = Array.from(selectedInterests); //convierte el set en un array
    const response = await axios.post("http://localhost:3001/profiles", {
      name: firstName,
      last_name: lastName,
      dob: brithday.toISOString(),
      gender: genero,
      nationality,
      languages: languages.map((language) => language.value),
      bio,
      photo: image,
      user: user.userId,
      interest: interests,
    });
    setOpen(true);
    setTimeout(() => navigate("/home"), 2000);
  };

  return (
    <Stack sx={{ m: 5 }} alignItems="center">
      <Stack sx={{ p: 8, width: 600, backgroundColor: "#262938" }} spacing={2}>
        <Stepper activeStep={step}>
          <Step>
            <StepLabel>Informacion Personal</StepLabel>
          </Step>
          <Step>
            <StepLabel>Biografia</StepLabel>
          </Step>
          <Step>
            <StepLabel>Intereses</StepLabel>
          </Step>
          <Step>
            <StepLabel>Fotos</StepLabel>
          </Step>
        </Stepper>

        {step === 0 ? (
          <>
            <FormControl>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </FormControl>

            <Stack direction="row">
              <FormLabel sx={{ paddingRight: 2 }}>
                Fecha de Nacimiento
              </FormLabel>
              <DatePicker
                value={brithday}
                onChange={(date) => {
                  setBrithday(date);
                }}
              />
            </Stack>

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
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Otro"
                />
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
                // filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Idioma" />
                )}
              />
            </FormControl>

            <Stack direction="row" justifyContent="space-between">
              <ButtonDark disabled={step === 0} onClick={onBack}>
                Back
              </ButtonDark>
              <ButtonDark onClick={onNext}>
                Avanzar a intereses personales
              </ButtonDark>
            </Stack>
          </>
        ) : step === 1 ? (
          <>
            <FormControl
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                fullWidth
                label="Añade una Biografía sobre ti"
              />
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
              <ButtonDark onClick={onBack}>Back</ButtonDark>
              <ButtonDark onClick={onNext}>Cuales son tus interese</ButtonDark>
            </Stack>
          </>
        ) : step === 2 ? (
          <>
            <FormControl>
              <Stack>
                <Typography variant="h5">Intereses</Typography>
                {/* entries:convierte un objeto en un arreglo */}
                {Object.entries(Interests).map(([category, options]) => (
                  <Box key={category}>
                    <Typography variant="h6">{category}</Typography>
                    <Box direction="row" spacing={1} flexWrap="wrap">
                      {options.map((option) => (
                        <Chip
                          key={option.name}
                          variant="outlined"
                          avatar={
                            <Avatar sx={{ bgcolor: "white" }}>
                              {option.icon}
                            </Avatar>
                          }
                          label={option.name}
                          sx={{ mr: 1, mb: 1 }}
                          onClick={() => onSelectInterest(option.name)}
                          color={
                            selectedInterests.has(option.name)
                              ? "primary"
                              : "default"
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
              <ButtonDark onClick={onBack}>Back</ButtonDark>
              <ButtonDark onClick={onNext}>Ahora sube tus fotos</ButtonDark>
            </Stack>
          </>
        ) : step === 3 ? (
          <>
            <CardContent>
              <Div display="flex" justifyContent="center">
                {" "}
                {"Upload Photos"}{" "}
              </Div>
            </CardContent>
            <Box
              sx={{
                backgroundColor: "#333",
                minWidth: 500,
                minHeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UploadPhotos
                images={images}
                onChange={(images) => setImages(images)}
              />
            </Box>

            <ButtonDark onClick={onSave}>Guardar</ButtonDark>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  🎉🎉🎉Completed profile congratulations!!! 🥳
                </Typography>
              </Box>
            </Modal>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};
export default Profile;
