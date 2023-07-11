export const postOpenAiRequest = async (prompt: string) => {
  const response = await fetch('/api/ai/generate-answers', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  }).then(response => response.json());

  if (response.text) {
    return response.text;
  } else {
    //Show error
  }
};
