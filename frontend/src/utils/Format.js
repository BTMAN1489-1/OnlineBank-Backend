
 export const billFormat=(e, setBill)=>{
    const p = e.replace(/[^\d]/g, '')
    const v = p.replace(/[^\d]/g, '')
        .substring(0, 20);
    const parts = []
    for(let i =0; i<v.length;i+=4){
        parts.push(v.substring(i, i+4));
    }
    parts.length >1? setBill(parts.join(' ')):setBill(p)
}


 export const cardFormat=(e, setBill)=>{
     const p = e.replace(/[^\d]/g, '')
     const v = p.replace(/[^\d]/g, '')
         .substring(0, 16);
     const parts = []
     for(let i =0; i<v.length;i+=4){
         parts.push(v.substring(i, i+4));
     }
     parts.length >1? setBill(parts.join(' ')):setBill(p)
 }

 export const setBalance=(bill)=>{
     if(bill.type_account ==='credit'){
         return Number(Number(bill.description.max_debt_amount) + Number(bill.balance)).toFixed(2)
     }
     else return bill.balance
 }