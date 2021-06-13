const is10 = a => a === 10;

every(is10)([10, 10, 10]);      //=> true
every(is10)([0, 1, 10, 10, 6]); //=> false