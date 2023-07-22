import axios from 'axios';

export default async function getWakatimeStats(handle: string) {
  if (!handle) return null;
  try {
    const url = `https://wakatime.com/api/v1/users/${handle}/stats/last_7_days?is_including_today=true`;
    let response = await axios.get(url);
    let data = response.data;
    while (data.message === 'Calculating stats for this user. Check back later.') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      response = await axios.get(url);
      data = response.data;
    }
    const stats = {
      // textCodingTimeRecordet: data.categories[0].text,
      // from_date: data.categories.start_date,
      // to_date: data.categories.end_date,
    };

    return stats;
  } catch (err) {
    console.log(err, 'WAKATIME');
    return null;
  }
}
