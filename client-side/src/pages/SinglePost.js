import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Card, Form, Grid } from "semantic-ui-react";

import LikeButton from "../Components/LikeButton";
import { AuthContext } from "../Context/auth";
import moment from "moment";
import DeleteButton from "../Components/DeleteButton";

function SinglePost(params) {
  const postId = params.match.params.postId;
  const { user } = useContext(AuthContext);

  const [commentBody, setCommentBody] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setCommentBody("");
    },
    variables: {
      postId,
      body: commentBody,
    },
  });

  function redirectUserOnDelete() {
    params.history.push("/");
  }

  let postMarkup = "";
  if (!getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      likes,
      comments,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  color="blue"
                  as="div"
                  icon="comment"
                  label={{
                    color: "blue",
                    pointing: "right",
                    content: commentCount,
                  }}
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callBack={redirectUserOnDelete} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Submit a Comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="comment"
                        name="comment"
                        value={commentBody}
                        onChange={(event) => setCommentBody(event.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={commentBody.trim() === ""}
                        onClick={createComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>
                    {moment(comment.createdAt).fromNow(true)};
                  </Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        createdAt
        body
        username
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
