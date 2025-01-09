import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#121c36',
        color: 'white',
        padding: '16px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* 上层：社交图标和链接 */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{width: '100%', maxWidth: '1200px'}}
        spacing={2}
      >
        {/* 左侧：社交媒体图标 */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: {xs: 'center', sm: 'flex-start'},
            gap: 2,
          }}
        >
          <IconButton color="inherit" href="https://youtube.com">
            <YouTubeIcon />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
        </Grid>

        {/* 右侧：链接 */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: {xs: 'center', sm: 'flex-end'},
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="#"
            underline="hover"
            sx={{color: 'white', fontSize: '0.875rem'}}
          >
            Contact Us
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{color: 'white', fontSize: '0.875rem'}}
          >
            Privacy Policies
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{color: 'white', fontSize: '0.875rem'}}
          >
            Help
          </Link>
        </Grid>
      </Grid>

      {/* 下层：版权声明 */}
      <Typography sx={{fontSize: '0.875rem', textAlign: 'center'}}>
        ©2022 All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
