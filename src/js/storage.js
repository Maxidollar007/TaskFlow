export function storageDate(data){
    if(JSON.parse(localStorage.getItem("data"))?.length<=0){
        localStorage.setItem("data",JSON.stringify(data))
    }else{
        localStorage.setItem("data",JSON.stringify(data))
    }
}