# SimpleQuery

Use the following to test out the code
``` Javascript
var aa = new Column('id', 'int');
var bb = new Column('name', 'string');
var cc = new Column('mult', 'int');
var tt = new Table([aa,bb,cc]);
tt.Insert([1,'Tyler',10]);
tt.Insert([2,'Anna',9]);
tt.Insert([3,'Kellen',3]);

var tt2 = new Table([aa,bb,cc]);
tt2.Insert([1,'Tyler',10]);
tt2.Insert([1,'Trevor',11]);
tt2.Insert([2,'Anna',9]);
tt2.Insert([3,'Kellen',3]);

var jj = new Join(tt, tt2, ['id'],['id']);
var j_result = jj.Execute();
var jj2 = new Join(tt, tt2, ['id','name'],['id','name']);
var j2_result = jj2.Execute();

var calc = new Calculation(j_result, 2, [0]);
calc.Execute();
var calc2 = new Calculation(j_result, 2, [0,4]);
calc2.Execute();
```
