import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

export const dataTabs = [
    {
        id: 1,
        icon: <AccessTimeIcon />,
        name: 'Access',
        active: true
    },
    {
        id: 2,
        icon: <AddAlarmIcon />,
        name: 'AddAlarm',
        active: true
    },
    {
        id: 3,
        icon: <HistoryToggleOffIcon />,
        name: 'Timer',
        active: true
    }
]