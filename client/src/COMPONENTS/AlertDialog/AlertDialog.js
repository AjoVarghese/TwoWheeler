import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { acceptRentRequests } from '../../redux/Actions/ADMIN_ACTIONS/rentRequestsAction';
import { toast } from 'react-hot-toast';

export default function AlertDialog({closeDialog,Id,ownerId,functionToBeDone,message,action}) {
    console.log("RENT DETAILS",Id);
    console.log("Action",action);
    // console.log("funtion to done",functionToBeDone);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const[loading,setLoading] = React.useState(false)

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };

//   const onProceed = () => {

//   }

const handleClick = () => {
  functionToBeDone()
  closeDialog(false)
  toast.success('Bike successfully deleted from garage!')
}

// const functionToBeDone = (bikeId) => {
//   setLoading(true)
//   dispatch(acceptRentRequests(bikeId))
//   setLoading(false)
//   closeDialog(false)
//   
// }

  return (
    <div>
      
      {
        
        
        <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          {"Are you Sure?"}
          
          {/* {<p>{details.vehicleName}</p>} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Do you want to continue with this action? */}
            {message}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button   color='error' onClick={(e) => {
            closeDialog(false)
          }}>
            Close
          </Button>
          <Button autoFocus color='success' onClick={(e) => {
            handleClick(Id)
            // functionToBeDone(bikeId)
          }} >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
         
      }
      
    </div>
  );
}