"use client";
import { useState } from "react";

export default function ImageGenerator() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  async function query(data: any) {
    console.log("data", data);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.blob();
    const output = URL.createObjectURL(result);
    return output;
  }
  const onClickHandler = async () => {
    try {
      const input = { inputs: text };
      const result = await query(input);
      console.log("result", result);
      setUrl(result);
      console.log("url", url);
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Text-To-Image"
        name="data"
      />
      <button onClick={onClickHandler}>Generate Image</button>

      <img src={url} width={200} height={200} alt="Image" />
    </div>
  );
}
