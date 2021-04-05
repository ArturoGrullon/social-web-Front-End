import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Button, Label, Popup } from "semantic-ui-react";

/**
 * Updates in the database the number of likes of a post
 * @param {String} user
 * @param {Object} post
 */
function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    },
  });

  const LikeButton = user ? (
    liked ? (
      //Button filled when liked
      <Button color="red" icon="heart" size="small" />
    ) : (
      //Button not filled
      <Button basic color="red" icon="heart" size="small" />
    )
  ) : (
    <Button basic color="red" icon="heart" size="small" as={Link} to="/login" />
  );

  return (
    <Popup
      content={liked ? "Unlike!" : "Like!"}
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {LikeButton}
          <Label basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
