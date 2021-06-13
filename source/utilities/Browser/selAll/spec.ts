import selAll from "./";

describe("selAll", () => {
  test("test", async () => {
    const parent = document.createElement("parent");
    parent.setAttribute("id", "container");
    const child1 = document.createElement("span");
    child1.textContent = "some text";
    const child2 = document.createElement("span");
    child2.textContent = "other text";
    parent.appendChild(child1);
    parent.appendChild(child2);
    document.body.appendChild(parent);

    const selected = selAll("#container span");

    expect(selected.length).toBe(2);
    expect(selected[0].tagName).toBe("SPAN");
    expect(selected[0].textContent).toBe("some text");
    expect(selected[1].textContent).toBe("other text");

    document.body.textContent = "";
  });
});
