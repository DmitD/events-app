import { makeStyles } from "tss-react/mui";

export const useStyles =  makeStyles()((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px'
    },
    // smMargin: {
    //     margin: theme.spacing(1),
    // },
    // actionDiv: {
    //     textAlign: 'center',
    // },
}));