import axios from "axios";

export default async (query) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US%&include_adult=false&include_video=false&${query}`;

  try {
    const response = await axios({
      url,
    });

    const { data, status, statusText } = response;

    if (status !== 200) return { error: statusText };

    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
