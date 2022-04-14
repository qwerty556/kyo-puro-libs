

process.stdin.resume();
process.stdin.setEncoding('utf8');

const p = console.log

Array.prototype.pipe = function(fn){return fn(this)}
Array.prototype.pluck = function(prop){return this.map(obj=>obj[prop])}

Array.range = (start,end)=>{
        const [small,big] = [start,end].sort((a,b)=>a-b)
        const arr = Array.from({length:big - small + 1},(_,i)=> i + small)
        return start > end ? arr.reverse() : arr
    }

Array.tablePrint=(doubleArray)=>{
        for(const arr of doubleArray){
            arr.forEach(any=>process.stdout.write(String(any)))
            process.stdout.write("\n")
        }
    }

Array.transpose=(doubleArray) => doubleArray[0].map((_, c) => doubleArray.map(r => r[c]))
Array.tableCycle=(doubleArray)=>{
        const _arr = doubleArray
        const res = []
        const _i = _arr.length
        const _y = Math.min(..._arr.map(arr=>arr.length))
        
        for(let y = 0 ; y < _y  ; y+=1){
            const line = []
            for(let i = _i -1  ; i >= 0 ; i-=1){
                line.push(_arr[i][y])
            }
            res.push(line)
        }
        return res
    }
    
const DequeProtType = {
    length:0,
    first:undefined,
    last:undefined,
    [Symbol.iterator]:function(){
        const f = this.first
        return {
            current : {next:f},
            next(){
                return (this.current = this.current.next) 
                    ? {value: this.current.value, done: false}
                    : {done: true}
            }
        }
    },
    get(i){
        if(!this.length) return undefined
        let node_ = this.first
        while(i-- && node_ && (node_ = node_.next));
        return node_ ? node_.value : node_  
    },
    push(item){
        if(this.length) this.last = this.last.next = {value:item,before:this.last}
        else this.first = this.last = {value:item}
        this.length++
    },
    unshift(item){
        if(this.length) this.first = this.first.before = {value:item,next:this.first}
        else this.first = this.last = {value:item}
        this.length++
    },
    pop(){
        if(this.length === 0) return undefined
        if(this.length === 1) return this.shift()
        const item = this.last.value
        this.last = this.last.before
        this.last.next = undefined
        this.length--
        return item
    },
    shift(){
        if(this.length === 0) return undefined
        if(this.length === 1) {
            const item = this.first.value 
            this.first = this.last = undefined
            this.length--
            return item
        }
        const item = this.first.value
        this.first = this.first.next
        this.first.before = undefined
        this.length--
        return item
    },
}

const Deque = (arr) => {
    const arrToNode = (arr) => {
        return arr.map(_=>({value:_})).map((_,i,arr_)=>{
            _.next = arr_[i + 1]
            _.before = arr_[i - 1]
            return _
        })
    }
    const node = arrToNode(arr)
    const obj = Object.assign(Object.create(DequeProtType),{
        first:node[0],last:node[node.length - 1],length:node.length
    })
    return obj
}

/**
 * option.order ? 並び順を保証する : 並び順を保証しない
 * 
 * option.firstLastWin ? 先勝ち : 後勝ち
 * 
 * option.prop ? 特定のプロパティによりユニーク判定する : arr[n] によりユニーク判定する
 * 
 * ユニーク処理の比較対象はプリミティブ型である必要がある
 */
 Array.uniq = (arr,option) => {
    const option__ = Object.assign({order:false, firstLastWin:false, prop:undefined},option)
    if(option__.order && option__.prop){
        const set = new Set()
        const reduceCallbackfn = (uniqArr,item) => {
            if(!set.has(item[option__.prop])){
                set.add(item[option__.prop])
                uniqArr.push(item)
            }
            return uniqArr
        }
        return (option__.firstLastWin ? arr.reduce(reduceCallbackfn,[]) : arr.reduceRight(reduceCallbackfn,[]).reverse())
    }else if(option__.order && !option__.prop){
        const set = new Set()
        const reduceCallbackfn = (uniqArr,item) => {
            if(!set.has(item)){
                set.add(item)
                uniqArr.push(item)
            }
            return uniqArr
        }
        return (option__.firstLastWin ? arr.reduce(reduceCallbackfn,[]) : arr.reduceRight(reduceCallbackfn,[]).reverse())
    }else if(!option__.order && option__.prop){
        const items = (option__.firstLastWin ? arr.reverse() : arr)
        return Array.from(new Map(items.map(_ => [_[option__.prop],_])).values())
    }else if(!option__.order && !option__.prop){
        const items = option__.firstLastWin ? arr.reverse() : arr
        return Array.from(new Set(items).values())
    }
}

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


Math.sum = (...nums)=>nums.reduce((total,n)=>total+n,0)
Math.between = (start,end) => (target) => start <= target && target <= end

//ここまでlibs

const lines = require("fs")
    .readFileSync("/dev/stdin", "utf8")
    .split("\n")
    .pipe(Deque)









