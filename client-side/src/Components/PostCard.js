import React, { useContext } from "react";
import { Card, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../Context/auth";
import LikeButton from "../Components/LikeButton";
import DeleteButton from "../Components/DeleteButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user: logInUser } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description> {body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={logInUser} post={{ id, likeCount, likes }} />
        <Button
          basic
          color="blue"
          content="Comments"
          icon="comment"
          as={Link}
          to={`/posts/${id}`}
          size="small"
          label={{
            basic: true,
            color: "blue",
            pointing: "left",
            content: commentCount,
          }}
        />
        {logInUser && logInUser.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
