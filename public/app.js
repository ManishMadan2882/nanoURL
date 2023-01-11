
const copyBtn = document.getElementById('copy');
function send(event){
    event.preventDefault();
    const object = {
        url:document.getElementById('url').value
    }
    fetch('/',{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
             },
        body:JSON.stringify(object)     
    })
    .then((res)=>res.json())
    .then((data)=>{
            if(document.body.contains(document.getElementById('reply')))
            {
                document.getElementById('reply').innerHTML=`
            <span id="shortlink" class=" bg-teal-200 p-2 float-left text-sm">
        
             ${data.short_link}
      
            </span>
            <button  id="copy" onclick="copyURL()"  class="float-right inline text-teal-700 font-semibold  bg-teal-300 hover:bg-teal-500 drop-shadow-2xl text-sm hover:text-white p-2  my-2">Copy URL</button>

            `;
            }
            else{
            
           let newElem=document.createElement('div');
            newElem.classList.add("text-center","my-6");
            newElem.setAttribute("id", "reply");
            newElem.innerHTML=`
            <span id="shortlink" class=" bg-teal-200 p-2 float-left text-sm">
        
             ${data.short_link}
      
            </span>
            <button  id="copy" onclick="copyURL()"  class="float-right inline text-teal-700 font-semibold  bg-teal-300 hover:bg-teal-500 drop-shadow-2xl text-sm hover:text-white p-2  my-2">Copy URL</button>

            `;
            document.getElementById('main').appendChild(newElem);

            }

            document.getElementById('subm').disabled = true;
            
            
    })
    .catch((err)=>console.log(err));
} 
function copyURL(){
 navigator.clipboard.writeText(document.getElementById('shortlink').innerHTML)
 .then(()=>{
    document.getElementById('copy').innerHTML = 'Copied  !'
 })   
}
