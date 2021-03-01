import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';

//Todo! Check post at the back end 
function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {

    const likeClick = () => console.log('Liked')
    const commentClick = () => console.log('Comment')

    return(
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as ={Link} to = {`/posts/${id}`} > {moment(createdAt).fromNow(true)} </Card.Meta>
        <Card.Description> {body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
           <Button
              color='red'
              content='Like'
              icon='heart'
              label={{ basic: true, color: 'red', pointing: 'left', content: {likeCount}.toString() }}
              onClick= {likeClick}
            />
            <Button
              basic
              color='blue'
              content='Comments'
              icon='comment'
              label={{
                basic: true,
                color: 'blue',
                pointing: 'left',
                content: {commentCount}.toString(),
              }}
              onClick = {commentClick}
            />  
      </Card.Content>
    </Card>
    )
}

export default PostCard;