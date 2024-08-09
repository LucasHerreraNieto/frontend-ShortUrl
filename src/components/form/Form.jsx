import { ReactDOM } from 'react-dom';
import React, { useState } from "react";
import '../../assets/style/formStyle.css'




const Form = () => {

    const [url, setUrl] = useState("");
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            "https://backend-shorturl-tfa8.onrender.com", {
            method: "POST",
            body: JSON.stringify({urlOriginal: url}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)
        showNewUrl(result.urlCorta)
        
    }

    const createAElement = (e) => {
        var link = document.createElement("a");
        link.setAttribute("href", `https://backend-shorturl-tfa8.onrender.com/${e}`);
        link.setAttribute("target", "_blank");
        var LinkText = document.createTextNode(`https://backend-shorturl-tfa8.onrender.com/${e}`);
        link.appendChild(LinkText);
        return link;
    }

    const createPElement = (link) =>{
        var p = document.createElement("p");
            var text = document.createTextNode("Tu URL acortada es: ");
            p.appendChild(text);
            p.appendChild(link);
            return p;
    }

    const createDivElement = (p)=>{
        var divUrl = document.createElement("div");
        divUrl.setAttribute("id", "divUrl");
        divUrl.className = "bg-black min-w-10 md:max-w-xl w-full max-w-80 h-28 md:min-h-28 container flex items-center justify-center  rounded-md bg-slate-100 border shadow-xl bg-opacity-90";
        divUrl.appendChild(p);
        return divUrl;
    }


    const showNewUrl = async (e) => {

        let element = document.getElementById("divUrl");

        if(element != null){
            element.remove();
            var position = document.getElementById("position");
            var divUrl = createDivElement(createPElement(createAElement(e)));
            position.appendChild(divUrl);
        }else{
            var position = document.getElementById("position");
            var divUrl = createDivElement(createPElement(createAElement(e)));
            position.appendChild(divUrl);
            
    }
        
    }



    return ( 
        <div id="position" className="basis-11/12 flex flex-col gap-6 items-center justify-center w-full ">
            <h2 className="text md:text-9xl text-6xl">Short-Url</h2>
            <div className="min-w-10 md:max-w-xl w-full max-w-80 h-48 md:min-h-60 container flex items-center justify-center  rounded-md bg-slate-100 border shadow-xl bg-opacity-90">
                
                <form className="border-solid w-fit ">
                    <input type="url" name="url" placeholder="Enter URL" className="w-60 md:w-96 h-9 shadow-lg rounded-l-md" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </form>
                <button type="submit" className="bg-sky-400 w-24 h-9 shadow-lg rounded-r-md" onClick={handleOnSubmit}>Shortener</button>
            </div>  
            
        </div>
    );
}

export default Form;