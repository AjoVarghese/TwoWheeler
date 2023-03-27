import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function AlertDialog({closeDialog,id}) {
    console.log("RENT DETAILS",id);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };

//   const onProceed = () => {

//   }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you Sure?"}
          <h1>ddd</h1>
          {/* {<p>{details.vehicleName}</p>} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to continue with this action?
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  color='error' onClick={(e) => {
            closeDialog(false)
          }}>
            Close
          </Button>
          <Button autoFocus color='success' onClick={(e) => {
            
          }} >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}