import './Bar.css'
import HelpIcon from '@mui/icons-material/Help';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Height } from '@mui/icons-material';
import { Grow } from '@mui/material';
import { generateDateList } from '../services/dateService';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import NativeSelect from '@mui/material';
import FormControl from '@mui/material';
import LanguageDropdown from '../dropdown/LenguageDropdown';
import { getWordFromSeed } from '../services/randomWords';

const Bar = ({ changeDate, language, setLanguage, setEnd, setWords, setStart, getWordFromSeed, setPlayingDate, openCalendar, setOpenCalendar }) => {

    const [openHelp, setOpenHelp] = useState(false);
    const handleOpenHelp = () => setOpenHelp(true);
    const handleCloseHelp = () => setOpenHelp(false);

    const handleOpenCalendar = () => setOpenCalendar(true);
    const handleCloseCalendar = () => setOpenCalendar(false);

    const [completedLevels, setCompletedLevels] = useState({});

    const [dateList, setDateList] = useState([]);

    const changeDay = (date) => {
        changeDate(date, language, setEnd, setWords, setStart, getWordFromSeed, setPlayingDate);
        console.log(date)
        handleCloseCalendar(true);
    }

    useEffect(() => {
        if (openCalendar) {
            const endDate = new Date();
            endDate.setDate(new Date().getDate());
            //const endDateFormat = endDate.toISOString().split('T')[0];

            const list = generateDateList();
            setDateList(list);
        }
    }, [openCalendar]);

    useEffect(() => {
        const levels = localStorage.getItem('completedLevels');
        setCompletedLevels(levels ? JSON.parse(levels) : {});
    }, [openCalendar])

    return (
        <>
            <div className="bar-container">
                <div style={{ width: '3rem' }}></div>
                <HelpOutlineIcon onClick={handleOpenHelp} className='icon' />
                <h2 className='title'>Word Bridge</h2>
                <CalendarMonthIcon onClick={handleOpenCalendar} className='icon' />
                <LanguageDropdown language={language} setLanguage={setLanguage}></LanguageDropdown>
            </div>
            <Modal
                open={openHelp}
                onClose={handleCloseHelp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    '.MuiPaper-root': {
                        border: 'none !important',
                        boxShadow: 'none !important',
                        outline: 'none !important',

                    }
                }}
            >
                <Grow in={openHelp} timeout={300}>
                    <Box className={"box-container"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
                            🎮 How to play 🎮
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'justify', fontWeight: 'bold', color: '#333' }}>
                            Welcome to "Word Bridge" 🎮, a unique word association challenge! The game displays two words: one at the bottom (⬇️) and another at the top (⬆️) of your screen. Your exciting task 🧠 is to connect these words by building a bridge of related words, moving from the bottom ⬇️ to the top ⬆️.

                            Imagine the bottom word is "moon" 🌙 and the top word is "tide" 🌊. You might link them like "moon 🌙 → gravity 🛸 → ocean 🌊 → tide 🌊." Starting from the lower word, each connection in your chain should logically lead upwards ⬆️ to your destination word at the top.

                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'justify', fontWeight: 'bold', color: '#333' }}>

                            This game 🎲 tests your vocabulary and creative thinking skills, challenging you to think outside the box 📦 and make clever connections. As you progress through levels, the puzzle becomes more intricate and thought-provoking, offering endless fun and mental stimulation.

                            "Word Bridge" 🌉 is perfect for puzzle enthusiasts, word game lovers, and anyone who enjoys a good brain teaser. Get ready to explore the amazing world of words and climb your way to the top! 🏆
                        </Typography>
                    </Box>
                </Grow>
            </Modal>
            <Modal
                open={openCalendar}
                onClose={handleCloseCalendar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    '.MuiPaper-root': {
                        border: 'none !important',
                        boxShadow: 'none !important',
                        outline: 'none !important',
                    }
                }}
            >
                <Grow in={openCalendar} timeout={300}>
                    <Box className={"box-container"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='modal-title'>
                            📈 Levels history 📈
                        </Typography>
                        <Grid container spacing={2} className='tiles-container'>
                            {[...dateList].reverse().map((date, index, reversedArray) => (
                                <Grid item xs={'auto'} key={index} className={"calendar-grid"}>
                                    <Box
                                        onClick={() => changeDay(date)}
                                        className={
                                            `tiles ${completedLevels[date] && completedLevels[date][language] && completedLevels[date][language].length > 0
                                                ? "green-tile"
                                                : ""
                                            }`
                                        }
                                    >
                                        {reversedArray.length - index}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grow>
            </Modal>
        </>
    )
}

export default Bar;