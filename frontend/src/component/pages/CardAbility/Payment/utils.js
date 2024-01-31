export const billFormat=(e)=>{
    const p = e.replace(/[^\d]/g, '')
    const v = p.replace(/[^\d]/g, '')
        .substring(0, 20);
    const parts = []
    for(let i =0; i<v.length;i+=4){
        parts.push(v.substring(i, i+4));
    }
    if(parts.length >1)
        return(parts.join(' '))
    return p
}

