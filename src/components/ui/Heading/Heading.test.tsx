import { render } from "@testing-library/react";

import { Heading } from "@/components/ui/Heading/Heading";

describe("Headingのレンダリングテスト", () => {
  it("h1でレンダリングできる", async () => {
    const label = "見出し";
    const res = render(<Heading>{label}</Heading>);

    expect(res.getByRole("heading", { level: 1 })).toBeTruthy(); // h1
    expect(res.queryByText(label)).not.toBeNull();
  });

  it("h2でレンダリングできる", async () => {
    const res = render(<Heading as="h2">見出し</Heading>);

    expect(res.getByRole("heading", { level: 2 })).toBeTruthy(); // h2
  });
});
