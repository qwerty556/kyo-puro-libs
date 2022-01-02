
/**
 * option.order ? 並び順を保証する : 並び順を保証しない
 * 
 * option.firstLastWin ? 先勝ち : 後勝ち
 * 
 * option.prop ? 特定のプロパティによりユニーク判定する : 
 * 
 * ユニーク処理の比較対象はプリミティブ型である必要がある
 */
Array.uniq = (arr,option) => {
    const option__ = Object.assign({},{order:false, firstLastWin:false, prop:undefined},option)

    if(option__.order && option__.prop){

        let itemAndIndexs = arr.map(((item,index) => ({item,index}))).map(_ => [_.item[option__.prop],_])
        itemAndIndexs = option__.firstLastWin ? itemAndIndexs.reverse() : itemAndIndexs
        return Array.from(new Map(itemAndIndexs).values()).sort((a,b) => a.index - b.index).map(_ => _.item)

    }else if(option__.order && !option__.prop){

        let items = arr.map(((item,index) => ({item,index}))).map(_ => [_.item,_])
        items = option__.firstLastWin ? items.reverse() : items
        return Array.from(new Map(items).values()).sort((a,b) => a.index - b.index).map(_ => _.item)

    }else if(!option__.order && option__.prop){

        let items = arr.map(_ => [_[option__.prop],_])
        items = option__.firstLastWin ? items.reverse() : items
        return Array.from(new Map(items).values())

    }else if(!option__.order && !option__.prop){
        let items = arr
        items = option__.firstLastWin ? items.reverse() : items
        return Array.from(new Set(items).values())
    }
}

describe('uniqテスト', () => {
    let i = 1
    test('case_' + i++ + ":順番保障無し、後勝ち、プロパティ指定なし", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:false, firstLastWin:false, prop:undefined})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([1])).toStrictEqual([1])
        expect(uniq([1,1,2,1]).sort((a,b) => a- b)).toStrictEqual([1,2])
        expect(uniq([1,2,3,2,1]).sort((a,b) => a- b)).toStrictEqual([1,2,3])
        expect(uniq([{a:1,b:2},{a:1,b:3},{a:1,b:2}])).toStrictEqual([{a:1,b:2},{a:1,b:3},{a:1,b:2}])//ユニーク処理の比較対象はプリミティブ型である必要がある
    })

    test('case_' + i++ + ":順番保障無し、先勝ち、プロパティ指定なし", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:false, firstLastWin:true, prop:undefined})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([1])).toStrictEqual([1])
        expect(uniq([1,1,2,1]).sort((a,b) => a- b)).toStrictEqual([1,2])
        expect(uniq([1,2,3,2,1]).sort((a,b) => a- b)).toStrictEqual([1,2,3])
        expect(uniq([{a:1,b:2},{a:1,b:3},{a:1,b:2}])).toStrictEqual([{a:1,b:2},{a:1,b:3},{a:1,b:2}])//ユニーク処理の比較対象はプリミティブ型である必要がある
    })

    test('case_' + i++ + ":順番保障無し、後勝ち、プロパティ指定", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:false, firstLastWin:false, prop:"a"})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([{a:1,b:2,index:0},{a:3,b:4,index:1},{a:1,b:5,index:2}]).sort((a,b) => a.index - b.index))
            .toStrictEqual([{a:3,b:4,index:1},{a:1,b:5,index:2}])
    })

    test('case_' + i++ + ":順番保障無し、先勝ち、プロパティ指定", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:false, firstLastWin:true, prop:"a"})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([{a:1,b:2,index:0},{a:3,b:4,index:1},{a:1,b:5,index:2}]).sort((a,b) => a.index - b.index))
            .toStrictEqual([{a:1,b:2,index:0},{a:3,b:4,index:1}])
    })


    test('case_' + i++ + ":順番保障あり、後勝ち、プロパティ指定なし", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:true, firstLastWin:false, prop:undefined})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([1])).toStrictEqual([1])
        expect(uniq([1,1,2,1])).toStrictEqual([2,1])
        expect(uniq([1,2,3,2,1])).toStrictEqual([3,2,1])
    })

    test('case_' + i++ + ":順番保障あり、先勝ち、プロパティ指定なし", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:true, firstLastWin:true, prop:undefined})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([1])).toStrictEqual([1])
        expect(uniq([1,1,2,1])).toStrictEqual([1,2])
        expect(uniq([1,2,3,2,1])).toStrictEqual([1,2,3])
    })

    test('case_' + i++ + ":順番保障あり、後勝ち、プロパティ指定", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:true, firstLastWin:false, prop:"a"})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([{a:1,b:2,index:0},{a:3,b:4,index:1},{a:1,b:5,index:2}]))
            .toStrictEqual([{a:3,b:4,index:1},{a:1,b:5,index:2}])
    })

    test('case_' + i++ + ":順番保障あり、先勝ち、プロパティ指定", ()=>{
        const uniq = (arr) => Array.uniq(arr,{order:true, firstLastWin:true, prop:"a"})
        expect(uniq([])).toStrictEqual([])
        expect(uniq([{a:1,b:2,index:0},{a:3,b:4,index:1},{a:1,b:5,index:2}]))
            .toStrictEqual([{a:1,b:2,index:0},{a:3,b:4,index:1}])
    })
})