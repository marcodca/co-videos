import axios from "axios";

export default async ({ genre, sortBy = "popularity.desc", pageNr = 1 }) => {
  try {
    const response = await axios({
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageNr}&with_genres=${genre}&with_runtime.gte=175`,
    });

    const { data, status, statusText } = response;

    if (status !== 200) throw new Error(statusText);

    return data;
  } catch (error) {
    console.error(error);
  }
};
