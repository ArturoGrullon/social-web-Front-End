import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

function DeleteButton({ callBack, postId }) {
  const [confirmOpen, setConfirmOpen] = useState();
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
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
