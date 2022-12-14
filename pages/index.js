import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import styles from '../styles/Home.module.css';
import {Tabs, Tab, Box, CircularProgress} from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab';
import { Conversion } from '../component/Conversion';
import Historique from '../component/Hisorique';


export default function Home() {
  const [listCurrency, setListCurrency] = useState([]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log('requete 1')
    axios.get('https://api.frankfurter.app/currencies')
    .then(function (response) {
      setListCurrency(response.data);
    })
    .catch(function (error) {
      setListCurrency([]);
    });
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Currency App</title>
        <meta name="description" content="Convert and check the historical of the main currency" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Conversion" value="1" />
                <Tab label="Historique" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" className={styles.conversion}>
              {listCurrency.length===0 ? <CircularProgress /> : <Conversion currency={listCurrency} />}
            </TabPanel>
            <TabPanel value="2" className={styles.conversion}>              
              {listCurrency.length===0 ? <CircularProgress /> : <Historique currency={listCurrency}/>}
            </TabPanel>
          </TabContext>
        </Box>
      </main>
    </div>
  )
}
