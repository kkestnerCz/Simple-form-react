import React, { useState, useEffect } from 'react'
import './App.css';

// MaterialUi
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createMuiTheme,  ThemeProvider} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
// Ikony
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

const SimpleForm = props => {
  // inputy
  const [Name, setName] = useState();
  const [ValName, setValName] = useState();
  const [Email, setEmail] = useState();
  const [ValEmail, setValEmail] = useState();
  const [Text, setText] = useState();
  const [ValText, setValText] = useState();

  // umožnit/zobrazit odeslat
  const [disSend, setDisSend] = useState(true);

  // otevření dialogového okna na reset
  const [openDialog, setOpenDialog] = useState(false);

  // styl
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ec8600',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
    },
  });


  // handle openDialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Handle CloseDialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Handle Dialog > reset
  const handleReset = () => {
    setName("");
    setValName();
    setEmail("");
    setValEmail();
    setText("");
    setValText();
    setDisSend(true);
    setOpenDialog(false);
  };

  // Handle send
  const handleSend = (e) => {
    e.preventDefault();

    // aspoň nějáký výstup
    console.log(JSON.stringify({Name, Email, Text}));

    // Takhle by to třeba mohlo vypadat:
    /*
    fetch('http://localhost:3002/send',{
        method: "POST",
        body: JSON.stringify({Name, Email, Text}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(
      (response) => (response.json())
        ).then((response)=>{
      if (response.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.status === 'fail'){
        alert("Message failed to send.")
      }
    })
    */
  };

  // řeší onChange a vymaže helper text, když je vše ok
  const handleChange = (e) => {
    
    // podmínky pro jméno:
    if(e.target.name === "formName") {
      setName(e.target.value);
      const reValName = /^[^\s]+( [^\s]+)+$/;
      if (reValName.test(e.target.value)) {
        setValName("");
      } else {
        setValName("Něco je špatně");
      }
    }

    // podmínky pro email:
    if(e.target.name === "formEmail") {
      setEmail(e.target.value);
      const reValEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (reValEmail.test(String(e.target.value).toLowerCase())) {
        setValEmail("");
      } else {
        setValEmail("Něco je špatně");
      }
    }

    // podmínky pro text zprávy
    if(e.target.name === "formText") {
      setText(e.target.value);
      const reValText = /^[^%]{3,}$/;
      if (reValText.test(String(e.target.value))) {
        setValText("");
      } else {
        setValText("Málo textu");
      }
    }

  }


  useEffect(() => {
    // podmínky pro odeslat btn
    if(ValEmail === "" & ValName === "" && ValText === "") {
      setDisSend(false)
    } else {
      setDisSend(true)
    }
  }, [ValEmail, ValName, ValText])
  

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Určitě začít znovu?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ne-e
            </Button>
            <Button onClick={handleReset} color="primary">
              Jasně
            </Button>
          </DialogActions>
        </Dialog>

        <p>
          <Grid container alignItems="center">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              error={ValEmail !== "" && ValEmail !== undefined}
              id="formEmail"
              label="Email"
              value={Email}
              helperText={ValEmail}
              onChange={handleChange}
              name="formEmail"
            />

            <Divider className="vertBr"  orientation="vertical" flexItem />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              error={ValName !== "" && ValName !== undefined}
              value={Name}
              id="formName"
              label="Jméno a příjmení"
              helperText={ValName}
              onChange={handleChange}
              name="formName"
            />
          </Grid>
        </p>
        <p>
          <TextField
            error={ValText !== "" && ValText !== undefined}
            fullWidth
            id="formText"
            label="Text zprávy"
            multiline
            rows={4}
            value={Text}
            helperText={ValText}
            onChange={handleChange}
            name="formText"
          />
        </p>
        <p>
          <Button startIcon={<SendIcon />} style={{ marginRight: 10 }} variant="contained" color="primary" disabled={disSend} onClick={handleSend}>
            Odeslat
          </Button>

          <Button startIcon={<DeleteIcon />} variant="contained" color="primary" onClick={handleDialogOpen}>
            Začít znovu
          </Button>
        </p>
      </ThemeProvider>
    </div>
  )
}

export default SimpleForm;
