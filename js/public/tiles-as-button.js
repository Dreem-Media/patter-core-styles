import { DOMReady } from "./_utils";

DOMReady(() => {
  const tiles = document.querySelectorAll('.tile-as-button');
  if (tiles) {
    tiles.forEach(item => {
      item.addEventListener('click', () => {
        let aTag = item.getElementsByTagName('a');
        if (aTag.length) {
          aTag = aTag[0];
          aTag.click();
        }
      });
    });
  }

});
