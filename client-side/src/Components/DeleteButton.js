import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../Util/graphql";

function DeleteButton({ callBack, postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
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
      if (callBack) callBack();
    },
    variables: {
      postId,
    },
    onError(err) {
      console.log(err);
    },
  });
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
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
