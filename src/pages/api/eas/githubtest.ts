import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';

export default async function github(req: NextApiRequest, res: NextApiResponse) {
  const query = req.body;
  const { username } = query;

  const accessToken = req.headers;
  const graphQuery = `
      query userInfo($login: String!) {
        user(login: $login) {
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `;

  try {
    const result = await axios.post(
      'https://api.github.com/graphql',
      { query: graphQuery, variables: { login: username } },
      {
        headers: { Authorization: accessToken.authorization },
      },
    );

    return res.status(200).json({ data: result.data });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err });
  }
}
