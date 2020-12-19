import MuiAlert from '@material-ui/lab/Alert';

export const ALert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    margin: {
        margin: theme.spacing(1),
    },

}));