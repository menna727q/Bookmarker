var sitename= document.getElementById("sitename");
var siteurl= document.getElementById("siteurl");
var closebutton = document.getElementById("closebtn");
var boxdisplay = document.querySelector(".alert-box ");

var siteArray=[];

if(localStorage.getItem('sites')!=null)
{
    siteArray=JSON.parse(localStorage.getItem("sites"));
}
 function addinformation(){
   if(sitename.classList.contains("is-valid")&&siteurl.classList.contains("is-valid"))
   {
    var site={
        name:sitename.value,
        url:siteurl.value
    }
    siteArray.push(site);
    console.log(siteArray);
    localStorage.setItem("sites",JSON.stringify(siteArray));
    display(siteArray);
    clearform();
   }
   else{
    boxdisplay.classList.remove("d-none")
   }
 }
 function clearform(){
    sitename.value="";
    siteurl.value="";
 }
function display(arr){
 var box=``;
  for(var i=0;i<arr.length;i++)
  {
    box+=`<tr>
    <td>${i+1}</td>
    <td>${arr[i].name}</td>
    <td><button class="btn btn-warning"  onclick="visit(${i});">Visit</button></td>
    <td><button class="btn btn-warning" onclick="deleteSite(${i});">Delete</button></td>
</tr>`;
  }
  document.getElementById("tablebody").innerHTML=box;
}
  
function deleteSite(index){
  siteArray.splice(index,1);
  localStorage.setItem("sites",JSON.stringify(siteArray))
  display(siteArray);
}

function visit(index) {
    var siteindex = siteArray[index];
    
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(siteindex.siteurl)) {
      window.open(site.url);
    } else {
      window.open(`https://${siteindex.siteurl}`);
    }
  }
  var nameRegex=/^\w{3,}(\s+\w+)*$/;
  var urlRegex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


  sitename.addEventListener("input", function () {
    validate(sitename, nameRegex);
  });
  
  siteurl.addEventListener("input", function () {
    validate(siteurl, urlRegex);
  });
  
  function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  }

  //Close Modal Function

function closetab() {
    boxdisplay.classList.add("d-none");
  }
  
  // 3 ways to close modal => close button -  Esc key - clicking outside modal
  
  closebutton.addEventListener("click", closetab);
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-box")) {
        closetab();
    }
  });