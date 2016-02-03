const uniq = list => {
	const seen = [];
	return list.filter(item => seen.some(eq(item)) ? false : (seen.push(item), true));
};