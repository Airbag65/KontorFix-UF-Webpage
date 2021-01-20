const mailAdress1 = document.querySelector(".mailLink").innerHTML;

function copyAdress(){
    alert(`Kopierade ${mailAdress1} till urklipp!`);
    document.execCommand("Copy");
}
