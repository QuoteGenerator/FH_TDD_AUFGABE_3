function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

function increase(item, amount = 1) {
  item.quality = Math.min(MAX_QUALITY, item.quality + amount);
}

function decrease(item, amount = 1) {
  item.quality = Math.max(MIN_QUALITY, item.quality - amount);
}

function isAgedBrie(item) {
  return item.name === 'Aged Brie';
}

function isBackstage(item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isSulfuras(item) {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

function isConjured(item) {
  return item.name.startsWith('Conjured');
}

function updateNormal(item) {
  const degrade = isConjured(item) ? 2 : 1;
  decrease(item, degrade);

  if (item.sell_in < 0) {
    decrease(item, degrade);
  }
}

function updateAgedBrie(item) {
  increase(item);

  if (item.sell_in < 0) {
    increase(item);
  }
}

function updateBackstage(item) {
  increase(item);

  if (item.sell_in < 11) increase(item);
  if (item.sell_in < 6) increase(item);

  if (item.sell_in < 0) {
    item.quality = 0;
  }
}

function updateItem(item) {
  if (item.name === 'Sulfuras, Hand of Ragnaros') {
    return;
  }

  const isAgedBrie = item.name === 'Aged Brie';
  const isBackstage = item.name === 'Backstage passes to a TAFKAL80ETC concert';
  const isConjured = item.name.startsWith('Conjured');

  // 1. NORMAL UPDATE (vor sell_in decrement!)
  if (isAgedBrie) {
    item.quality += 1;
  } else if (isBackstage) {
    item.quality += 1;

    if (item.sell_in <= 10) item.quality += 1;
    if (item.sell_in <= 5) item.quality += 1;
  } else {
    const degrade = isConjured ? 2 : 1;
    item.quality -= degrade;
  }

  // 2. SELL_IN DECREMENT
  item.sell_in -= 1;

  // 3. AFTER SELL DATE LOGIC (IMPORTANT: jetzt sell_in schon reduziert!)
  if (item.sell_in < 0) {
    if (isAgedBrie) {
      item.quality += 1;
    } else if (isBackstage) {
      item.quality = 0;
    } else {
      const degrade = isConjured ? 2 : 1;
      item.quality -= degrade;
    }
  }

  // 4. bounds clamp
  if (item.quality < 0) item.quality = 0;
  if (item.quality > 50) item.quality = 50;
}

function update_quality() {
  for (let i = 0; i < items.length; i++) {
    updateItem(items[i]);
  }
}