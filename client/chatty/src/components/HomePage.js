
import '../App.css';
import io from 'socket.io-client';
import Avatar from '@mui/material/Avatar';

import * as React from 'react';
import {useState,useEffect,useContext,useRef} from 'react'
import { UserContext } from '../UserContext';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import { Card, CardContent, Typography } from '@mui/material';
import dateFormat from 'date-format';
import Message from './Message';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const socket=io.connect('http://127.0.0.1:5000')

function HomePage() {
  const [message,setMessage]=useState('');
  const [chat,setChat]=useState([]);
  const [initialChatFetched, setInitialChatFetched] = useState(false);
  const {userInfo,isLoading}=useContext(UserContext);
  const [open, setOpen] = React.useState(false);
    const [darkMode, setDarkMode] = useState(true);
    let modeColor = darkMode ? 'black' : 'white';
  
  const username=userInfo?.username;
  



const handleClick = () => {
  if (!username) {
    setOpen(true); // If username is not defined, set open state to true
  } else {
    // If username is defined, send the chat message
    socket.emit("sentMessage", { message, username });
    setMessage("");
  }
};

const handleMode = () => {
  setDarkMode(prevMode => !prevMode); 
  modeColor = !darkMode ? 'black' : 'white'; 
};

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
 const action = (
    <React.Fragment>
     
      <IconButton
        size="small"
        aria-label="close"
        color="black"
        onClick={handleClose}
      >
        <CloseIcon fontSize="size" />
      </IconButton>
    </React.Fragment>
  );


  



//   const ScrollToBottom = () => {
//     const elementRef = useRef();
//     useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }));
//     return <div ref={elementRef} />;
// };
// const ScrollToBottom = () => {
//   const elementRef = useRef();

//   useEffect(() => {
//     elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
//   }, [chat]); // Trigger scroll animation whenever chat updates

//   return <div ref={elementRef} className="scroll-to-bottom" />;
// };
const bottomRef=useRef(null);
const topRef=useRef(null);
useEffect(()=>{
  bottomRef.current.scrollIntoView({behavior:'smooth'});
},[chat])



  useEffect(()=>{
    socket.on("receivedMessage",(payload)=>{
      setChat([...chat,payload]);
      console.log('payload',payload)
      setInitialChatFetched(false);
    })
    return()=>{
        socket.off('receivedMessage');
    }
  },[initialChatFetched]);

  
     
    


  useEffect(()=>{
    if (!initialChatFetched) {
      socket.emit('initialChat');
      setInitialChatFetched(true);
    }
    socket.on('initialChatHistory', (chatHistory) => {
        console.log('chat history',chatHistory)
      setChat(chatHistory);
    });

    return () => {
      socket.off('initialChatHistory');
    };

  },[chat]);


  
  return (
   
    
      
       <div className="App" style={{display:'flex' ,flexDirection:'column',backgroundColor:modeColor}}>

      <Container  maxWidth="md">
    
     {  chat.map((payload,index)=>{
      let msgDate = dateFormat('hh:mm,dd/MM/yy', new Date(payload.createdAt));
      return(<>
        
       <Message
            key={index}
            author={payload.author}
            message={payload.Message} 
            time={msgDate} 
          />
         
       </>
       
      )
     })

       }
      
       
       <form >
     
         <Box
      
        
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        maxWidth:'80%'
      }}
    >
      <TextField  fullWidth autoFocus label="Message..." id="message" value={message} onChange={(e)=>setMessage(e.target.value)} sx={{backgroundColor:'white'}}/>
      <Button variant="contained"  size="large" onClick={handleClick}  sx={{ color: 'black' }}endIcon={<SendIcon /> }>
        Send
      </Button>
    </Box>
      
 <Avatar
      style={{ right: 20, bottom: 30, position: 'fixed', backgroundColor: 'black' }}
      onClick={handleMode}
    >
      {darkMode ?  <LightModeIcon />:<DarkModeIcon /> }
    </Avatar>
       
       </form>
         {/* <ScrollToBottom /> */}
         <div ref={bottomRef}></div>
         <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="please login to send msg"
        action={action}
      />
     </Container>
     </div>
     
  );
}

export default HomePage;


