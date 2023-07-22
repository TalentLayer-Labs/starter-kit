import axios from 'axios';

export default async function getLanguageStats(userId: string, accessToken: string) {
  const userInfo = await axios(`https://api.github.com/user/${userId}}`);

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
      { query: graphQuery, variables: { login: userInfo.data.login } },
      {
        headers: { Authorization: accessToken },
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

    return langRanking;
  } catch (err) {
    console.log(err);
    return null;
  }
}
