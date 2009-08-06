Screw.Unit(function() {
  describe("jquery-curtain", function() {
    before(function() { $("#container").curtain(); });
    after(function() { $("#container").curtain("remove"); });
    describe('when curtain is applied with the default options', function() {
      it("should have the curtain div placed over it", function() {
        expect($("#container > .jquery-curtain").length).to(equal, 1);
      });
    });

    describe('when the curtain is removed', function() {
      before(function() { $("#container").curtain().curtain("remove"); });

      it("should no longer exist", function() {
        expect($("#container > .jquery-curtain").length).to(equal, 0);
      });
    });
  });
});
