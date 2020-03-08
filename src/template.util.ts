export function template(tmpl: string, data: any) {
    let result = `const p = []; 
    function $empty(defaultValue) {
        const t = p.pop();
        if (t) {
            p.push(t);
        } else {
            p.push(defaultValue);
        }
    }
    p.push(\``;
    result += tmpl
        .replace(/\{\{\s*([^(\}\})]+?)(|!([^(\}\})]+))\s*\}\}/g, "`); p.push($1); $empty($3); p.push(`")
        .replace(/<%|\$>/g, "`);")
        .replace(/%>|<\$/g, "p.push(`");
    result += "`); return p.join('');";
    console.log(data);
    console.log(result);
    
    
    return new Function(result).apply(data); // apply改变函数执行的作用域
}