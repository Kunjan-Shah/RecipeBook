import React from 'react'
import './ProfileAvatar.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
}

function stringAvatar(name, size, fontSize) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      fontSize: fontSize
    },
    children: `${name.split(' ')[0][0]}`,
  };
}
  

export default function ProfileAvatar({name, size, fontSize}) {
    return (
        <div className="profile-avatar">
          <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(name, size, fontSize)} />
          </Stack>
        </div>
    )
}


