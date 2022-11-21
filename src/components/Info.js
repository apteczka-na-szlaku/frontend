import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import Modal from './Modal'
import history from '../history'

const Info = () => {
  const classes = useStyles()

  const handleClose = () => {
    localStorage.setItem('seenInitialInfo', 'true')
    history.push('/')
  }

  return (
    <Modal onClose={handleClose} short>
      <div className={classes.root}>
        <div className={classes.main}>
          <div>
            <img
              src='/logo-full.png'
              srcSet='/logo-full@2x.png 2x'
              className={classes.logo}
            />
            <Typography gutterBottom variant='body1'>
              Aplikacja inicjatywy <a href='https://apteczkanaszlaku.eu//' target='_blank'>Apteczka Na Szlaku</a>
            </Typography>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={handleClose}
              size='large'
            >Przejdź do mapy</Button>
          </div>
        </div>
        <div className={classes.footer}>
          <Typography className={classes.footerLeft} variant='body2' >
            Twórcy aplikacji:<br />
            <a href='https://github.com/firflant' target='_blank' >Michał Kokociński</a>, <a href='https://github.com/merito' target='_blank' >Dawid Wolski</a></Typography>
          <div>
            <Typography className={classes.footerRight} variant='body2' component='div'>
              Administracja:<br />
              <div style={{ marginLeft: 4 }}>
                Daniel Wojnar (<a href='mailto:apteczkanaszlaku@gmail.com'>apteczkanaszlaku@gmail.com</a>)
              </div>
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  )
}


const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      color: 'inherit',
    },
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    maxWidth: '100%',
    margin: '0 auto 34px',
    display: 'block',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.grey[800],
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  footerLeft: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  footerRight: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  partner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerLogo: {
    width: 86,
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '-5px 0 -8px 5px',
  },
  button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))

export default Info
