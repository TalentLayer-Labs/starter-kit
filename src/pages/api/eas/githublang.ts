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

    let repoNodes = result.data.data.user.repositories.nodes;

    repoNodes = repoNodes
      .filter(node => {
        return node.languages.edges.length > 0;
      })
      .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
      .reduce((acc, prev) => {
        let langSize = prev.size;

        if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
          langSize = prev.size + acc[prev.node.name].size;
        }
        return {
          ...acc,
          [prev.node.name]: {
            name: prev.node.name,
            color: prev.node.color,
            size: langSize,
          },
        };
      }, {});

    const totalLang = Object.keys(repoNodes)
      .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
      .reduce((result, key) => {
        result[key] = repoNodes[key];
        return result;
      }, {});

    const langRanking = Object.entries(totalLang)
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, 5)
      .map(([key, value]) => ({
        name: value.name,
        score: (value.size / Object.values(totalLang).reduce((a, b) => a + b.size, 0)) * 100,
      }));

    return res.status(200).json({ data: langRanking });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err });
  }
}
