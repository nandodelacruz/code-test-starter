import { render, screen, fireEvent } from "@testing-library/react";

import { ErrorBoundary } from "@/components/features/ErrorBoundary";

function ThrowOnce({ fail }: { fail: boolean }) {
  if (fail) {
    throw new Error("test render error");
  }
  return <div>Recovered content</div>;
}

describe("ErrorBoundary", () => {
  it("renders fallback UI when a child throws", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowOnce fail />
      </ErrorBoundary>,
    );
    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  it("resets and shows children after Try again", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    let shouldFail = true;
    function ToggleThrow() {
      if (shouldFail) throw new Error("boom");
      return <div>Recovered content</div>;
    }

    render(
      <ErrorBoundary>
        <ToggleThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    shouldFail = false;
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(screen.getByText("Recovered content")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
