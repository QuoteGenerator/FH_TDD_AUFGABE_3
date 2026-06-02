describe("Gilded Rose", function() {
  it("normal item decreases quality by 1", function() {
      items = [new Item("foo", 10, 20)];

      update_quality();

      expect(items[0].quality).toEqual(19);
  });

  it("normal item decreases sell_in by 1", function() {
        items = [new Item("foo", 10, 20)];

        update_quality();

        expect(items[0].sell_in).toEqual(9);
    });

    it("quality never goes below zero", function() {
        items = [new Item("foo", 10, 0)];

        update_quality();

        expect(items[0].quality).toEqual(0);
    });
});
