import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Grow } from '@mui/material'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import { useAppDispatch } from '../../redux/store'
import { getPosts } from '../../redux/posts/asyncActions'
import { useStyles } from './styles'
import { selectAuthData } from '../../redux/auth/selectors'

const Home: React.FC = () => {
	const { classes } = useStyles()
	const dispatch = useAppDispatch()
	const { isLoadingAuthData } = useSelector(selectAuthData)
	const [currentId, setCurrentId] = React.useState<null | number>(null)

	React.useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justifyContent='space-between'
					alignItems='stretch'
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid className={classes.btMarg} item xs={12} sm={4}>
						{isLoadingAuthData ? (
							<></>
						) : (
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}

export default Home
