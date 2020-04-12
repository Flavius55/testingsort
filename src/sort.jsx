import React from 'react';
import './sort.css';

let vector = [];
let compara = [];
let maxim=100;

let wheight = window.innerHeight;
let wwidth  = window.innerWidth;

let lungime = (wwidth*7/10)/(wwidth/200*3) ;

function generateNewArray()
{
    for(let i=0;i<lungime;i++)
    {
        vector[i] = randomInteger(5, maxim);
    }
    let r=randomInteger(5,lungime-5);
    vector[r] = maxim-1;
}

function randomInteger(min,max)
{
    return Math.floor(Math.random()*(max-min)+min);
}

function distantier()
{
    document.getElementsByClassName("bars")[0].style.marginLeft="5vw";
}

class Element extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        generateNewArray();
        console.log(window.height);
        console.log(window.width);
        return(
            <div className="grafic">
                {
                vector.map((value,index) =>
                ( <div className="bars" 
                        style={{height: `${Math.floor(value*((wheight)*65/100)/100)}px`}} 
                        key={index}></div>
                ))
                }
                <button className="buttoN" onClick={reset()}></button>
            </div>
        );
    }
}

window.onload = function()
{
    distantier();
    //console.log(Math.floor(wheight*65/100)-1);
}

function reset()
{
    generateNewArray();
    /*let bar = document.getElementsByClassName("bars");
    for(let i=0;i<lungime;i++)
    {
        bar[i].style.height = vector[i]*(((wheight)*65/100)/100)+'px';
    }*/
}

export default Element;
