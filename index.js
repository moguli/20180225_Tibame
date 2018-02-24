let outputTag=$("#output")[0];
let host=$("#host")[0].value;
let port=$("#port")[0].value;
let index=1;
let getStatus=({status})=>{
    outputTag.value=`${outputTag.value}=> response status: ${status}\n`;
    outputTag.value=`${outputTag.value}${index.toString().padEnd(20,'=')}\n`;
    outputTag.scrollTop = outputTag.scrollHeight;
    index++;
    return status;
}
//=================
//    set host
//=================
Rx.Observable.fromEvent($("#host")[0],'keyup')
.subscribe((e)=>{
    host=e.target.value;
})
Rx.Observable.fromEvent($("#port")[0],'keyup')
.subscribe((e)=>{
    port=e.target.value;
})
//=================
//    send Data
//=================
Rx.Observable.fromEvent($("#sendBtn")[0],'click')
.mergeMap(()=>{
    let data=$("#sendData")[0].value;
    $("#sendData")[0].value=''
    
    outputTag.value=
    `${outputTag.value}<= send to http://${host}:${port}/mineBlock,\n`
    +`<= mothod: POST,\n`
    +`<= body: {"data":"${data}"}\n\n`;

    outputTag.scrollTop = outputTag.scrollHeight;

    return Rx.Observable.ajax({url:`http://${host}:${port}/mineBlock`, method: 'POST', headers: {
        'Content-Type': 'application/json',
      } ,body:{data:data}});
})
.catch((error,obs)=>{
    return Rx.Observable.of(error)
})
.map(getStatus).repeat()
.subscribe();

//=================
//    add Peer
//=================
Rx.Observable.fromEvent($("#addPeerBtn")[0],'click')
.mergeMap(()=>{
    let peeripport=$("#peeripport")[0].value;
    $("#peeripport")[0].value='';
    
    outputTag.value=
    `${outputTag.value}<= send to http://${host}:${port}/addPeer,\n`
    +`<= mothod: POST,\n`
    +`<= body: {"peer":"ws://${peeripport}"}\n\n`;

    outputTag.scrollTop = outputTag.scrollHeight;

    return Rx.Observable.ajax({url:`http://${host}:${port}/addPeer`, method: 'POST', headers: {
        'Content-Type': 'application/json',
      } ,body:{peer:`ws://${peeripport}`}});
}).catch((error)=>{
    return Rx.Observable.of(error)
}).map(getStatus).repeat()
.subscribe();

//=================
//    get info
//=================
Rx.Observable.interval(1000).mergeMap(()=>{
    let getblock=Rx.Observable.ajax(`http://${host}:${port}/blocks`);
    return getblock
}).catch((error)=>{
    error.response=[]
    return Rx.Observable.of(error)
}).mergeMap(({response})=>{
    response.reverse();
    $("#blockchain")[0].value=JSON.stringify(response,null,3)
    let getPeer=Rx.Observable.ajax(`http://${host}:${port}/peers`);
    return getPeer;
}).catch((error)=>{
    error.response=[]
    return Rx.Observable.of(error)
}).repeat().subscribe({
    next:({response})=>{
        $("#peers")[0].value=JSON.stringify(response,null,3)
    }
});