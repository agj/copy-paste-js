
const uniq = list => {
	const seen = [];
	return list.filter(item => seen.some(eq(item)) ? false : (seen.push(item), true));
};

const some = p => list => list.some(p);

const any = p => list => list.any(p);

const isIn = list => obj => list.some(a => a === obj);
