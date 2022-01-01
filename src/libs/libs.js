

process.stdin.resume();
process.stdin.setEncoding('utf8');

const p = console.log

Array.prototype.pipe = function(fn){return fn(this)}
Array.prototype.pluck = function(prop){return this.map(obj=>obj[prop])}

Array.range = (start,end)=>{
        const [small,big] = [start,end].sort((a,b)=>a-b)
        const arr = Array.from({length:Math.abs(big - small) + 1},(_,i)=> i + small)
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


Math.sum = (...nums)=>nums.reduce((total,n)=>total+n,0)
Math.between = (start,end) => (target) => start <= target && target <= end

//ここまでlibs

// const lines = require("fs")
//     .readFileSync("/dev/stdin", "utf8")
//     .split("\n")
//     .pipe(Deque)









