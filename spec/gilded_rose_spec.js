describe("Gilded Rose", function() {
  it("normal item decreases quality by 1", function() {
      items = [new Item("foo", 10, 20)];

      update_quality();

      expect(items[0].quality).toEqual(19);
  });
});
