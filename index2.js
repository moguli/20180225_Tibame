Rx.Observable.fromEvent(document.getElementById('sendBtn'),'click')
.mergeMap(()=>{
  let host= document.getElementById('host').value;
  let port= document.getElementById('port').value;
  let data= document.getElementById('sendData').value;

  return Rx.Observable.ajax({url:`http://${host}:${port}/mineBlock`, method: 'POST', headers: {
    'Content-Type': 'application/json',
    } ,body:{data:data}});
})
.catch((error,obs)=>{
  return Rx.Observable.of(error)
})
.subscribe();