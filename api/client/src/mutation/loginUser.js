import {gql} from '@apollo/client'

export const REG=gql`
mutation Mutation($name: String!, $emailid: String!, $password: String!) {
    createUser(name: $name, emailid: $emailid, password: $password) {
      emailid
      name
      password
    }
  }
`