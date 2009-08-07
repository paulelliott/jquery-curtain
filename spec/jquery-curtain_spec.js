Screw.Unit(function() {
  describe("jquery-curtain", function() {
    //Clean up the curtain after each run.
    after(function() { $("#container").curtain("remove"); });

    describe('when curtain is applied with the default options', function() {
      before(function() { $("#container").curtain(); });

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
    
    describe('when the curtain is invoked without an image', function() {
      before(function() { $("#container").curtain({ loader_image: '' }); });
      
      it("should not have an image inside the container", function() {
        expect($("#container img").length).to(equal, 0);
      });
    });
  });
});
