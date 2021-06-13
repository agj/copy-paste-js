import complement from "./";

describe("complement", () => {
  test("test", async () => {
    assert.plan(8);

    var id = function (a) {
      return a;
    };

    assert.false(complement(id)(true));
    assert.false(complement(id)(1));
    assert.false(complement(id)("truthy"));
    assert.true(complement(id)(0));
    assert.true(complement(id)(""));
    assert.true(complement(id)(false));
    assert.true(complement(id)(undefined));
    assert.true(complement(id)(null));
  });
});
