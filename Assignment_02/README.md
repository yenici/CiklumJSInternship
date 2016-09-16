Implement _.cloneDeep, _.extend methods from Lodash.

```deepExtend
compareDeep

var obj1 = {
  a: 1,
  b: 2,
  c: {
     d: 4
  }
};

var obj2 = {
  a: 1,
  b: 2,
  c: {
     d: 3
  }
};

deepExtend(obj1, obj2)
compareExtend(obj1, obj2)  // true/false
```

Test coverage:
```
----------------|----------|----------|----------|----------|----------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------|----------|----------|----------|----------|----------------|
All files       |    97.33 |    98.46 |      100 |    97.33 |                |
 deepClone.js   |      100 |      100 |      100 |      100 |                |
 deepCompare.js |    95.35 |    97.37 |      100 |    95.35 |          64,65 |
 deepExtend.js  |      100 |      100 |      100 |      100 |                |
----------------|----------|----------|----------|----------|----------------|
```