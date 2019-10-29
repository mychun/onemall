export function addClass(el, className) {
    if (hasClass(el, className)) return;
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}
export function removeClass(el, className) {
    if (hasClass(el, className)) {
        let newClass = el.className.split(' ');
        let index = newClass.indexOf(className);
        newClass.splice(index, 1);
        el.className = newClass.join(' ');
    };

}
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
export function getElementsByClassName(classname, node) { //node是父节点
    node = node || window.document;
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    }
    else {
        var results = new Array();
        var elems = node.getElementsByTag("*");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                results[elems.length] = elems[i];
            }
        }
        return results;
    }
}

export function siblings(elem) { //参数elem就是想取谁的兄弟节点，就把那个元素传进去 
    var nodes = []; //定义一个数组，用来存elem的兄弟元素 
    var previ = elem.previousSibling;
    while (previ) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 previ表示previousSibling 
        if (previ.nodeType === 1) {
            nodes.push(previ);
        }
        previ = previ.previousSibling; //最后把上一个节点赋给previ 
    }
    nodes.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了 
    var nexts = elem.nextSibling; //再取elem的弟弟 
    while (nexts) { //判断有没有下一个弟弟结点 nexts是nextSibling的意思 
        if (nexts.nodeType === 1) {
            nodes.push(nexts);
        }
        nexts = nexts.nextSibling;
    }
    return nodes; //最后按从老大到老小的顺序，把这一组元素返回 
} 