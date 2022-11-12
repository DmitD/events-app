import { makeStyles } from 'tss-react/mui'
import { deepPurple } from '@mui/material/colors'

export const useStyles = makeStyles()(theme => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 50px',

		[theme.breakpoints.down('sm')]: {
			justifyContent: 'space-between',
		},
	},
	heading: {
		color: 'rgba(0,183,255, 1)',
		textDecoration: 'none',

		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	image: {
		marginLeft: '15px',

		[theme.breakpoints.down('sm')]: {
			marginLeft: '0',
		},
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '400px',

		[theme.breakpoints.down('sm')]: {
			justifyContent: 'flex-start',
			width: '100px',
		},
	},
	profile: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '400px',

		[theme.breakpoints.down('sm')]: {
			justifyContent: 'flex-start',
		},
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
		marginRight: '25px',

		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
		marginRight: '15px',
	},
}))
