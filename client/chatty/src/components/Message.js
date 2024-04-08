import React from 'react';
 import { useContext } from 'react';

import { Card, CardContent, Typography } from '@mui/material';
 import { UserContext } from '../UserContext';
 import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
const Message = ({ author, message, time }) => {
    const { userInfo, isLoading } = useContext(UserContext);
    console.log('userinfo:',userInfo);
    const isCurrentUser = author === userInfo?.username;
  return (

    <Card variant="outlined" style={{ marginBottom: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' ,position: 'relative',maxWidth:'85%',marginLeft: isCurrentUser ? 'auto' : 0,
        marginRight: isCurrentUser ? 0 : 'auto',backgroundColor: isCurrentUser ? '#f0f0f0' : undefined}}>
           
      <CardContent sx={{display:'flex',flexDirection:'column'}}>
      <Box sx={{display:'flex' ,position:'relative'}}>
       {/* {!isCurrentUser&&<Avatar sx={{ bgcolor: deepOrange[500] ,position:'absolute', width:25,height:25,marginRight:30,top:0}}>
       {author && author[0].toUpperCase()}
                       </Avatar>}
        <Typography variant="subtitle2" color="textSecondary"  sx={{position:'absolute',left:30,top:0}}>
           {author} 
          
          {isCurrentUser ? 'You' : `@${author}`}
  </Typography>  */}

 {/* {userInfo && userInfo.username && ( */}

  {!isCurrentUser ? (
    <Chip avatar={<Avatar sx={{ bgcolor: '#e87e35 '}}>
    {author && author[0].toUpperCase()}
    </Avatar>} label={author} style={{  backgroundColor: 'black',color:'white' }} />
  ) : (
    <Chip label="You" style={{ backgroundColor: 'black',color:'white'}}/>
    // '#ebf5ff'
  ) }

        <Typography variant="caption" color="textSecondary" sx={{position:'absolute',top:0,right:0}}>
          {time}
        </Typography>
        
        
        </Box>
        <Typography variant="body1" sx={{position:'relative',alignSelf:'flex-start', textAlign:'left',overflowWrap:'break-word'}}>
          
          {message}
        
        </Typography>
       
      </CardContent>
    </Card>
  );
};

export default Message;


