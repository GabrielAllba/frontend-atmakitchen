import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TransaksiContent from './TransaksiContent';
import { usePathname, useSearchParams } from 'next/navigation'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const option = [
    { opsi: 'Semua' },
    { opsi: 'Menunggu Jarak' },
    { opsi: 'Menunggu Pembayaran' },
    { opsi: 'Sudah Bayar' },
    { opsi: 'Pembayaran Terverifikasi' },
    { opsi: 'Diterima' },
    { opsi: 'Diproses' },
    { opsi: 'Siap di-pickup' },
    { opsi: 'Sedang dikirim' },
    { opsi: 'Sudah di-pickup' },
    { opsi: 'Selesai' },
];

export default function TransaksiTabs({ id }: { id: number }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable force tabs example"
                >
                    {option.map((opt, index) => {
                        return (
                            <Tab
                                label={opt.opsi}
                                {...a11yProps(index)}
                                sx={{
                                    backgroundColor: value === index ? '#1976D2' : 'transparent',
                                    color: value === index ? 'white' : 'black',
                                    borderBottom: value === index ? '2px solid white' : 'none',
                                    transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s',
                                }}
                            />
                        );
                    })}
                </Tabs>
            </Box>
            {option.map((item, index) => {
                return (
                    <CustomTabPanel value={value} index={index}>
                        <TransaksiContent status={item.opsi} id={id}></TransaksiContent>
                    </CustomTabPanel>
                );
            })}
        </Box>
    );
}
