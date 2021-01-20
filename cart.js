const submitButton = document.querySelector(".order-form");
submitButton.addEventListener("submit", submitForm);

let confirmSubmition = false;

function confirm(){
    console.log("hello")
    document.querySelector(".confirm-order").style.opacity = "100";
    document.querySelector(".confirm-order").style.pointerEvents = "all";
}

function submitForm(e){
    e.preventDefault();

    //Formulär inputs ↓
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let adress = document.getElementById("adress").value;
    let appartmentNumber = document.getElementById("appartment").value;
    let postNumber = document.getElementById("post-number").value;
    let town = document.getElementById("town").value;

    let IIIamount = document.getElementById("kabelFixIIIamount").value;
    IIIamount = parseInt(IIIamount);
    let Vamount = document.getElementById("kabelFixVamount").value;
    Vamount = parseInt(Vamount);

    let totalCost = (IIIamount * 29.90) + (Vamount * 49.90);
    totalCost = Math.round(totalCost);



    let kabelFixIII = "";
    let kabelFixV  = "";

    if(IIIamount > 0){
        kabelFixIII = `${IIIamount} stycken KabelFix III`
    }
    if(Vamount > 0){
        kabelFixV = `${Vamount} stycken KabelFix V`
    }


    document.querySelector(".order-form").reset();
    
    let orderNumber = Math.floor(Math.random()*899999+100000);
    
    //Debuging ↓
    console.log(firstName, lastName, email, adress, appartmentNumber, postNumber, town, orderNumber, IIIamount, Vamount, totalCost)
    //Debuging ^
    
    document.querySelector(".to-pay").innerHTML = `Detta kommer kosta: ${totalCost} kronor`;

    confirm();

    document.querySelector(".confirm-order").addEventListener("click", function(){
        if (firstName !== "" && lastName !== "" && email !== "" && adress !== "" && postNumber !== "" && town !== ""){
            sendEmail(firstName, lastName, email, adress, appartmentNumber, postNumber, town, orderNumber, kabelFixIII, kabelFixV, totalCost);
        }
        document.querySelector(".confirm-order").style.opacity = "0";
        document.querySelector(".confirm-order").style.pointerEvents = "none";
        document.querySelector(".thank-you-message").style.opacity = "1";
        document.querySelector(".to-pay").innerHTML = '';
    }) 
}

function sendEmail(firstName, lastName, email, adress, appartmentNumber, postNumber, town, orderNumber, kabelFixIII, kabelFixV, totalCost){
    Email.send({ //Till kund
        Host: "smtp.gmail.com",
        Username: "info.kontorfix.uf@gmail.com",
        Password: "COMPANY SECRET :P",
        To: `${email}`,
        From: "info.kontorfix.uf@gmail.com",
        Subject: "Orderbekräftelse",
        Body: `Hej ${firstName} ${lastName}, <br/><br/>
        Din beställning har tagits emot och skickas så snart vi mottagit din betalning till din adress: ${adress}, ${postNumber} ${town}.<br/>
        Vänligen kontrollera att adressen stämmer. 
        Om inte, hör av dig till oss så snart som möjligt så löser vi det! <br/><br/>
        Din beställning: ${kabelFixIII}, ${kabelFixV} <br/>
        Ditt ordernummer: ${orderNumber}<br/>
        Summa att betala: ${totalCost} kronor.<br/><br/>
        Vänligen skicka din betalning till Swishnummer: 123 462 77 58 <br/>
        Skriv ditt ordernummer som meddelande<br/><br/>
        Om du undrar någonting, kontakta oss gärna på: info.kontorfix.uf@gmail.com <br/><br/>
        Med Vänliga Hälsningar<br/>
        KontorFix UF
        `
    }).then((message) => console.log("Email has been sent!"));
    Email.send({ //Till oss
        Host: "smtp.gmail.com",
        Username: "info.kontorfix.uf@gmail.com",
        Password: "COMPANY SECRET :P",
        To: "info.kontorfix.uf@gmail.com",
        From: "info.kontorfix.uf@gmail.com",
        Subject: `Ny order från ${firstName} ${lastName}`,
        Body: `Ny order har tagits emot av ${firstName} ${lastName} med ordernummer: ${orderNumber}<br/>
        ${firstName}'s e-postadress är: ${email}<br/>
        Beställningen består av: ${kabelFixIII}, ${kabelFixV}<br/>
        Den totala kostnaden som skall betalas är: ${totalCost} kr<br/><br/>
        Adress: ${adress}, lgh: ${appartmentNumber}<br/>
        ${postNumber} ${town}`
    }).then((message) => console.log("Email has been sent!"));
}
