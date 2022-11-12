import React from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { useStyles } from './styles'
import FileBase64 from 'react-file-base64'
import { useAppDispatch } from '../../redux/store'
import { createPost, updatePost } from '../../redux/posts/asyncActions'
import { useSelector } from 'react-redux'
import { selectPostById } from '../../redux/posts/selectors'
import { selectAuthData } from '../../redux/auth/selectors'

type FormProps = {
	currentId: null | number
	setCurrentId: (id: null | number) => void
}

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
	const { classes } = useStyles()
	const dispatch = useAppDispatch()
	const post = useSelector(selectPostById(currentId))
	const { authData } = useSelector(selectAuthData)
	const [postData, setPostData] = React.useState({
		title: '',
		message: '',
		tags: [''],
		selectedFile: '',
	})

	React.useEffect(() => {
		if (post) {
			setPostData({
				title: post.title,
				message: post.message,
				tags: post.tags,
				selectedFile: post.selectedFile,
			})
		}
	}, [post])

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (currentId) {
			dispatch(
				updatePost({
					id: currentId,
					post: { ...postData, name: authData!.name },
				})
			)
			clear()
		} else {
			dispatch(createPost({ ...postData, name: authData!.name }))
			clear()
		}
	}
	const clear = () => {
		setCurrentId(null)
		setPostData({ title: '', message: '', tags: [], selectedFile: '' })
	}

	if (!authData!?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please Sign In to create your own events and like other's events.
				</Typography>
			</Paper>
		)
	}

	if (authData && !authData.isActivated) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please confirm your email address first.
				</Typography>
			</Paper>
		)
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Editing' : 'Creating'} an Event
				</Typography>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={e => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={e => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={e =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase64
						type='file'
						multiple={false}
						onDone={({ base64 }: { base64: string }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	)
}

export default Form
