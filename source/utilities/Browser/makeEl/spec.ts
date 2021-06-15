import makeEl from "./";
import makeElEs5 from "./compatible.js";

describe("makeEl", () => {
  test("test", async () => {
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

    var el2 = makeElEs5(
      "div",
      { id: "some-id", class: "a-class" },
      makeElEs5("span", null, "Text content")
    );

    expect(el2.tagName).toBe("DIV");
    expect(el2.id).toBe("some-id");
    expect(el2.className).toBe("a-class");
    expect(el2.children[0].tagName).toBe("SPAN");
    expect(el2.children[0].textContent).toBe("Text content");
  });
});
