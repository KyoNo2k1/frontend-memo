import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    paginationAround1:{
        marginBottom: '1.5rem',
    },
    paginationAround2:{
        marginTop: '2rem',
    },
    gridContainer: {
        [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
        },
    },
}));