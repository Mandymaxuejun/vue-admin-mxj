let id = 0;
export function tree2list (nodes,childrenName,pid,level) {
    pid = pid || 0;
    level = level || 0;
    ++level
    let list = [];
    nodes.forEach(node => {
        node.pid = pid;
        node.id = ++id;
        node.level = level;
        list.push(node);
        if(node[childrenName]){
            const result = tree2list(node[childrenName],childrenName,node.id,level);
            list = list.concat(result);
            delete node[childrenName];
        }
    })
    return list
}

export function list2tree (data,childrenName,deep,filter){
    if(filter && typeof filter === 'function'){
        data = data.filter(filter);
    }
    let map = {};
    let arr = [];
    let result = [];
    for(let i = 0;i<data.length;i++){
        const item = data[i]
        let newItem = {}
        for(let prop in item){
            let value = item[prop];
            if(value == null) continue
            if(typeof value === 'object' || Array.isArray(value)) {
                if (!deep) continue
                value = JSON.parse(JSON.stringify(value))
            }
            newItem[prop] = value;
        }
        map[item.id] = newItem;
        arr.push(newItem)
    }
    arr.forEach(item => {
        if(!item.pid){
            result.push(item)
        }else{
            let parent = map[item.id]
            parent[childrenName] = parent[childrenName] || []
            parent[childrenName].push(item);
        }
    })
    return result;
}
