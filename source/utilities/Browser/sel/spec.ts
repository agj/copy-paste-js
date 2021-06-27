import sel from "./";

describe("sel", () => {
  test("test", async () => {
    const parent = document.createElement("parent");
    parent.setAttribute("id", "container");
    const child = document.createElement("span");
    child.setAttribute("class", "contained");
    child.textContent = "some text";
    parent.appendChild(child);
    document.body.appendChild(parent);

    const selected = sel("#container .contained");

    expect(selected).toBeDefined();
    expect(selected.tagName).toBe("SPAN");
    expect(selected.textContent).toBe("some text");

    document.body.textContent = "";
  });
});
