export const generatePicture = async (): Promise<string | null> => {
  const colors = ['Red', 'Orange', 'Green', 'Blue', 'Purple', 'Black', 'Yellow', 'Aqua'];
  const themes = [
    'ready for the future of work',
    'working on his computer',
    '^playing with a chinese abacus',
    'with a blanket',
    'with a 4 leaf clover',
    'just happy',
    'using a hammer',
    'climbing',
  ];
  const color = colors[getRandomInt(7)];
  const theme = themes[getRandomInt(7)];
  const customPrompt = `A cartoon futurist raccoon ${theme} with ${color} background `;
  const response = await fetch('/api/ai/generate-image', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: customPrompt,
    }),
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      return null;
    });
  return response.image;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
