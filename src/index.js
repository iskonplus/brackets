  
﻿module.exports = function check(str, bracketsConfig) {
	let strArr = str.split('');
	let el = [];

	for (let i = 0; i < bracketsConfig.length; i++) {
		for (let j = 0; j < bracketsConfig[i].length; j++) {
			let mass = [];
			let idx = strArr.indexOf(bracketsConfig[i][j]);

			while (idx !== -1) {
				mass.push(idx);
				idx = strArr.indexOf(bracketsConfig[i][j], idx + 1);
			}
			el.push(mass);
		}
	}

	for (let i = 0; i < bracketsConfig.length; i += 2) {
		for (let j = 0; j < bracketsConfig[i].length; j++) {
			if (bracketsConfig[i][j] === bracketsConfig[i][j + 1]) {
				if ((el[i].length - 1) % 2 === 0 && el[i].length - 1 === 0) {
					return false;
				}
			} else if (el[i].length !== el[i + 1].length) {
				return false;
			}
		}
	}

	let iter = 0;
	let count = 0;

	for (let i = 0; i < bracketsConfig.length; i++) {
		for (let j = 0; j < bracketsConfig[i].length; j++) {
			let idx = strArr.lastIndexOf(bracketsConfig[i][j]);
			let element = bracketsConfig[i][j];
			let nextElement = bracketsConfig[i][j + 1];
			let idxDouble = strArr.indexOf(bracketsConfig[i][j], iter);
			let nextElementDouble = strArr.indexOf(bracketsConfig[i][j], idxDouble + 1);

			if (element === nextElement) {
				if (idxDouble === -1 && i === bracketsConfig.length - 1) {
					i = 0;
					iter = 0;
					j--;
					continue;
				} else if (idxDouble === -1) {
					i++;
					j--;
					continue;
				}

				if (strArr[idxDouble] === strArr[idxDouble + 1]) {
					strArr.splice(idxDouble, 2);
					j--;
					if (strArr.length === 0) {
						return true;
					}
					continue;
				}

				count = nextElementDouble - idxDouble;
				if (count % 2 === 0) {
					return false;
				}

				iter = nextElementDouble + 1;
				j--;
				continue;
			}

			if (element === strArr[idx] && idx !== strArr.length - 1) {
				if (idx === strArr.indexOf(nextElement, idx) - 1) {
					if (strArr.indexOf(nextElement, idx) === -1) {
						return false;
					}

					if (strArr.length === 2) {
						return true;
					}

					strArr.splice(idx, 2);
					j--;
					continue;
				} else if (idx === strArr.indexOf(nextElement, idx) - 2) {
					return false;
				} else {
					j++;
				}
			} else if (idx !== -1 && strArr.indexOf(nextElement, idx) === -1 && nextElement !== undefined) {
				return false;
			}
		}
		if (strArr.length > 2 && i === strArr.length - 1) {
			i = 0;
			j = 0;
		}
	}
	return true;
};