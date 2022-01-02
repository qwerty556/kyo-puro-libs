

Array.binarySearchFirst = (sortedArr,target,compare) => {
    let i = -1
    let l = 0
    let r = sortedArr.length - 1
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        const compared = compare(sortedArr[m],target)
        if (compared === 0) {
            i = m
            r = m - 1
        } else if (compared < 0) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return i
}

Array.binarySearchLast = (sortedArr,target,compare) => {
    let i = -1
    let l = 0
    let r = sortedArr.length - 1
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        const compared = compare(sortedArr[m],target)
        if (compared === 0) {
            i = m
            l = m + 1
        } else if (compared < 0) {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return i
}

describe('binarySearchFirstテスト', () => {
    let i = 1
    test('case_' + i++, ()=>{
        const binarySearchFirst = (sorted,target) => Array.binarySearchFirst(sorted,target,(a,b) => a - b)
        expect(binarySearchFirst([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],1)).toBe(0)
        expect(binarySearchFirst([0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],1)).toBe(1)
        expect(binarySearchFirst([0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],1)).toBe(2)
        expect(binarySearchFirst([],1)).toBe(-1)
        expect(binarySearchFirst([1,2,3,4,5,6,7,8,9],0)).toBe(-1)
        expect(binarySearchFirst([1,2,3,4,5,6,7,8,9],1)).toBe(0)
        expect(binarySearchFirst([1,2,3,4,5,6,7,8,9],9)).toBe(8)
        expect(binarySearchFirst([1,2,3,4,5,6,7,8,9],5)).toBe(4)
    })
})

describe('binarySearchLastテスト', () => {
    let i = 1
    test('case_' + i++, ()=>{
        const binarySearchLast = (sorted,target) => Array.binarySearchLast(sorted,target,(a,b) => a - b)
        expect(binarySearchLast([1,1,1],1)).toBe(2)
        expect(binarySearchLast([1,1,0],1)).toBe(1)
        expect(binarySearchLast([1,1,1,0,0],1)).toBe(2)
        expect(binarySearchLast([],1)).toBe(-1)
        expect(binarySearchLast([1,2,3,4,5,6,7,8,9],0)).toBe(-1)
        expect(binarySearchLast([1,2,3,4,5,6,7,8,9],1)).toBe(0)
        expect(binarySearchLast([1,2,3,4,5,6,7,8,9],9)).toBe(8)
        expect(binarySearchLast([1,2,3,4,5,6,7,8,9],5)).toBe(4)
    })
})