import { makeStyles } from "tss-react/mui";

export const useStyles =  makeStyles()((theme) => ({
    mainContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column-reverse",
            rowSpacing: 1
        }
    },
    btMarg: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: "24px"
        }
    }
}));