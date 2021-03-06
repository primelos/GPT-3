import axios from "axios";

export const fetchData = async (getIt, model = "text-curie-001") => {
  try {
    const {
      data: { choices },
    } = await axios({
      method: "post",
      url: `https://api.openai.com/v1/engines/${model}/completions`,
      // url: "",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      data: {
        prompt: getIt,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    });
    return choices[0];
  } catch (error) {
    console.log(error);
  }
};
