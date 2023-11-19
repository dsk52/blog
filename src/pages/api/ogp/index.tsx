import { SITE } from "@/constants/site";
import { ImageResponse, type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {  
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : SITE.name;

      return new ImageResponse((
        <div
          style={{
            backgroundColor: "#fff",
            backgroundSize: "100% 100%",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "left",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            border: '10px solid #4a4a4a' 
          }}
        >
          <div
            style={{
              width: "100%",
              fontSize: 48,
              fontStyle: "normal",
              fontWeight: "bold",
              color: "#000",
              padding: "0 120px",
              lineHeight: 1.3,
              marginBottom: "30px",
              wordWrap: "break-word",
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: "100%",
              fontSize: 28,
              fontStyle: "normal",
              fontWeight: "bold",
              color: "#000",
              padding: "0 120px",
              lineHeight: 1.3,
            }}
          >
            {SITE.name}
          </div>
        </div>
      ), {
        width: 1200,
        height: 630
      })
  } catch (error) {
    // @ts-ignore
    console.error(error.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
