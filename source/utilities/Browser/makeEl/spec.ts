import makeEl from "./";

describe("makeEl", () => {
  test("test", async () => {
    expect.assertions(5);

    var el = makeEl(
      "div",
      { id: "some-id", class: "a-class" },
      makeEl("span", null, "Text content")
    );

    expect(el.tagName).toBe("DIV");
    expect(el.id).toBe("some-id");
    expect(el.className).toBe("a-class");
    expect(el.children[0].tagName).toBe("SPAN");
    expect(el.children[0].textContent).toBe("Text content");
  });
});
