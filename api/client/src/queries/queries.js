import {gql} from '@apollo/client'

export const LOGIN=gql`
query Query($emailid: String!, $password: String!) {
  login(username: $username, password: $password) {
    _id
    username
    password
  }
}`