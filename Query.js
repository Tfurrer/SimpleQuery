class Join
{
	constructor(_table1, _table2, _fields1, _fields2)
	{
		this.table1 = _table1;
		this.table2 = _table2;
		this.fields1 = _fields1;
		this.fields2 = _fields2;
	}
	Execute()
	{
		const _this = this;
		const t1 = _this.table1.GetColumnIDs(..._this.fields1);
		const t2 = _this.table2.GetColumnIDs(..._this.fields2);
		return _this.table1.data.map(x=>{
			return _this.table2.data.map(y=> {
				
				let alltrue = true;
				for(var i=0; i< t1.length; i++){
					if(x[t1[i]] !== y[t2[i]])
						alltrue = false;
				}
				if( alltrue)
					return x.concat(y);
				return null;
			}).filter(y=> y !== null);
		}).filter(x=> x !== null).flat();
	}
}
class Calculation
{
	constructor(_table, _actions, _groupby)
	{
		this.table = _table;
		this.action = _actions;
		this.groupby = _groupby;
	}
	Execute()
	{
		const _this = this;
		const groups = _this.Group(_this.table, _this.groupby, _this.action);
		return groups;
	}
	Group(arr, keys, action)
	{
		const helper = {};
		return arr.reduce(function(r, o) {
		  const key = keys.map(x=> {return o[x]; }).join('-');
		  
		  if(!helper[key]) {
			helper[key] = {'group': key, 'sum':  o[action]}; // create a copy of o
			r.push(helper[key]);
		  } else {
			helper[key].sum += o[action];
		  }

		  return r;
		}, []);
	}
}

class Column
{
	constructor(_name, _type)
	{
		this.name = _name;
		this.type = _type;
	}
	Get(){ return { 'name': this.name, 'type': this.type};}
}


class Table 
{
	//_columns should contain 
	constructor(_columns)
	{
		if(_columns === null)
			throw new Error('Columns must be supplied');
		this.columns = _columns.map((x,y)=> {return { id:y, name: x.name, type: x.type} });
		this.data = [];
		
	}
	AddColumn(column)
	{
		const id = this.columns[this.columns.length-1].id +1
		this.columns.push({ id: id, name: column.name, type: column.type});
	}
	Insert(values)
	{
		const _this = this;
		if(values.length !== _this.columns.length)
			throw new Error('Values Array length != Column length')
		_this.data.push(values);
	}
	GetColumnIDs()
	{
		const _this = this;
		const args = arguments;
		const cols = [];
		for(var i=0; i<args.length; i++){
			cols.push(_this.columns.filter(x=> x.name === args[i])[0].id);
		}
		return cols;
	}
	Select()
	{
		const _this = this;
		const args = arguments;
		const cols = [];
		for(var i=0; i<args.length; i++){
			cols.push(_this.columns.filter(x=> x.name === args[i])[0].id);
		}
		return _this.data.map(x=> {
			return cols.map(y=> {return x[y]});
		});
	}
	Copy()
	{
		const _this = this;
		const t = new Table( _this.columns.map(x => {return {name: x.name, type: x.type}}));
		_this.data.map(x=> { return t.Insert(x); });
		return t;
	}
}
