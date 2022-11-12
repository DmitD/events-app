import React from 'react'
import {
	Card,
	CardMedia,
	Typography,
	Button,
	CardContent,
	CardActions,
} from '@mui/material'
import { useStyles } from './styles'
import { PostType } from '../../../redux/posts/type'
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '../../../redux/store'
import { deletePost, likePost } from '../../../redux/posts/asyncActions'
import { useSelector } from 'react-redux'
import { selectAuthData } from '../../../redux/auth/selectors'

type PostProps = {
	post: PostType
	setCurrentId: (id: null | number) => void
}

const Post: React.FC<PostProps> = ({ post, setCurrentId }) => {
	const { classes } = useStyles()
	const dispatch = useAppDispatch()
	const { authData } = useSelector(selectAuthData)

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(like => like === authData?.id) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
				</>
			)
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		)
	}

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={post.selectedFile}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'>{post.name}</Typography>
				<Typography variant='body2'>
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			{authData?.id === post.creator && (
				<div className={classes.overlay2}>
					<Button
						style={{ color: 'white' }}
						size='small'
						onClick={() => setCurrentId(post._id)}
					>
						<MoreHorizIcon fontSize='medium' />
					</Button>
				</div>
			)}
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{post.tags.map(tag => `#${tag} `)}
				</Typography>
			</div>
			<Typography
				className={classes.title}
				gutterBottom
				variant='h5'
				component='h2'
			>
				{post.title}
			</Typography>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!authData}
					onClick={() => dispatch(likePost(post._id))}
				>
					<Likes />
				</Button>
				{authData?.id === post.creator && (
					<Button
						size='small'
						color='primary'
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize='small' />
						<span className={classes.deleteTitle}>Delete</span>
					</Button>
				)}
			</CardActions>
		</Card>
	)
}

export default Post
