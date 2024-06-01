let count=0;

async function gotoaction(event){
    event.preventDefault()
    
    const data={
        title:event.target.title.value,
        imgUrl:event.target.imgUrl.value,
        discription:event.target.discription.value
    }
    
    await axios
    .post('https://crudcrud.com/api/1978c92666464b48b57f17af6a088020/api',data)
    .then((res)=>{
        disply(res.data);
        document.getElementById('title').value=''
        document.getElementById('imgurl').value=''
        document.getElementById('discription').value=''
        count++;
        document.getElementById('cou').textContent=`totalblog:${count}`
    })
 }


  function disply(res){
    let mainE=document.getElementById('uldata');

    let t=document.createElement('div');
    t.innerHTML=`
    <h4>${res.title}</h4>
    <img src=${res.imgUrl}></img>
    <p>${res.discription}</p>
    <button onclick=edit(event)>edit</button>
    <button onclick=del(event)>delete</button>`;
    t.id=res._id
    mainE.appendChild(t)

 }


  function edit(event){
    let el=event.target.parentElement;
    let id=el.id

    axios
    .delete(`https://crudcrud.com/api/1978c92666464b48b57f17af6a088020/api/${id}`)
    .then((res)=>{
        console.log(el.querySelector('h4').textContent)
        count--;
        document.getElementById('cou').textContent=`totalblog:${count}`
        document.getElementById('title').value=el.querySelector('h4').textContent
        document.getElementById('imgurl').value=el.querySelector('img').src
        document.getElementById('discription').value=el.querySelector('p').textContent
        
        event.target.parentElement.remove()
    })

 }


 function del(event){
    let el=event.target.parentElement;
    let id=el.id
    axios
    .delete(`https://crudcrud.com/api/1978c92666464b48b57f17af6a088020/api/${id}`)
    .then((res)=>{
        event.target.parentElement.remove()
        console.log(res)
        count--;
        document.getElementById('cou').textContent=`totalblog:${count}`
    })

 }

 window.addEventListener('load',(evn)=>{
    axios
    .get('https://crudcrud.com/api/1978c92666464b48b57f17af6a088020/api')
    .then((res)=>{
        console.log(res)
        count=res.data.length;
       for(i=0;i<res.data.length;i++){
            disply(res.data[i])
            document.getElementById('cou').textContent=`totalblog:${count}`
       }
    })
    .catch((re)=>{
        console.log(res)
    })
    console.log('o')
 })



  