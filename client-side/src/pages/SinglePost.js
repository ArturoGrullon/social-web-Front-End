import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Card, Grid } from "semantic-ui-react";

import LikeButton from "../Components/LikeButton";
import { AuthContext } from "../Context/auth";
import moment from "moment";
import DeleteButton from "../Components/DeleteButton";

function SinglePost(params) {
  const postId = params.match.params.postId;
  const { user } = useContext(AuthContext);

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const redirectUserOnDelete = () => params.history.push("/");

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
    }
  }
`;

export default SinglePost;
