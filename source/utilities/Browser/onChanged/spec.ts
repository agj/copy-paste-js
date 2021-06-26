import onChanged from "./";
import makeEl from "../makeEl";
import { nextTick } from "../../../test-utils";

describe("onChanged", () => {
  test("listens to child additions and removals", async () => {
    const child1 = makeEl("div", { id: "child-1" });
    const parent = makeEl("div", { id: "parent" }, child1);
    const spy = jest.fn();

    var disconnect = onChanged(parent, spy);

    const child2 = makeEl("span", { id: "child-2" });
    parent.appendChild(child2);

    await nextTick();

    expect(spy).toHaveBeenCalledTimes(1);

    parent.removeChild(child1);

    await nextTick();

    expect(spy).toHaveBeenCalledTimes(2);

    disconnect();

    const child3 = makeEl("div", { id: "child-3" });
    parent.appendChild(child3);

    await nextTick();

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
