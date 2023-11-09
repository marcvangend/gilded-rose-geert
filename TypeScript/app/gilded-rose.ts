/* 
Eerst leesbaarheid verbeteren
- For loop omzetten naar foreach. Hierdoor kan er gebruik gemaakt worden van item ipv this.items[i]
- Maak losse functies van alle acties zoals het omhoog/omlaag zetten van de quality of updaten van de items. Hierdoor is er meer overzicht en minder code nodig om dezelfde functionaliteit te draaien.
- Wanneer de naam 'Sulfuras, Hand of Ragnaros' is, hoeft er niks te gebeuren. dus een "return" word dan toegepast.
- Draai een aantal if statements zoals "if item.name != 'Aged Brie else" om naar "if item.name == 'Aged Brie else". Dit leest gemakkelijker en zorgt voor minder nesting
- quality = quality - quality gewoon quality = 0 van gemaakt.
- De if statement van 'Backstage passes to a TAFKAL80ETC concert' net anders gebouwd zodat increaseQuality() niet meerdere keer hoeft gedraait te worden maar i.p.v een juiste waarde meegeeft. 

Toevoegen van 'Conjured Mana Cake'
- if check of naam gelijk staat aan 'Conjured Mana Cake', zo ja geef waard 2 mee i.p.v 1
*/

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function increaseQuality(item, value) {
  item.quality = Math.min(item.quality + value, 50);
}


function decreaseQuality(item, value) {
  if (item.quality > 0) {
      item.quality -= value;
  }
}

function descreaseSellIn(item) {
  item.sellIn = item.sellIn - 1
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name == 'Sulfuras, Hand of Ragnaros') {
        return;
      }
      
      if (item.name == 'Aged Brie') {
        increaseQuality(item, 1);
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert'){
        if (item.sellIn < 6) {
          increaseQuality(item, 3);
        } else if (item.sellIn < 11) {
          increaseQuality(item, 2);
        } else {
          increaseQuality(item, 1);
        }
      } else if (item.name === 'Conjured Mana Cake'){
        decreaseQuality(item, 2);
      } else {
        decreaseQuality(item, 1);
      }
      
      descreaseSellIn(item);

      if (item.sellIn < 0) {
        if (item.name == 'Aged Brie') {
          increaseQuality(item, 1);
        } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          item.quality = 0;
        } else {
          decreaseQuality(item, 1);
        }
      }
    });

    return this.items;
  }
}