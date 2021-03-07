import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../Util/graphql";

function DeleteButton({ commentId, callBack, postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePostOrComment] = useMutation(
    commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION,
    {
      update(proxy) {
        setConfirmOpen(false);
        if (!commentId) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          });
          const newData = data;
          proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: {
              getPosts: newData,
            },
          });
        }
        if (callBack) callBack();
      },
      variables: {
        postId,
        commentId,
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  return (
    <>
      <Button
        as="div"
        color="red"
        icon="trash"
        onClick={() => setConfirmOpen(true)}
        floated="right"
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
