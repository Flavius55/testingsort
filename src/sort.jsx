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

class Element extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        generateNewArray();
        return(
            <div className="grafic">
                <div className="pad">
                {
                vector.map((value,index) =>
                ( <div className="bars" 
                        style={{height: `${Math.floor(value*((wheight)*65/100)/100)}px`}} 
                        key={index}></div>
                ))
                }
                </div>
                <button className="buttN" onClick={(e) => reset()}></button>
                <button className="buttoN" onClick={(e) => BubbleSort()}></button>
            </div>
        );
    }
}

function reset()
{
    //BubbleSort();
    generateNewArray();
    vector.map((value,index) =>
    {
        let bar = document.getElementsByClassName("bars");
        bar[index].style.height = Math.floor(value*((wheight)*65/100)/100) +'px';
    })
}

function BubbleSort()
{
    let OK,aux;
    compara = [];
    do{
        OK=1;
        for(let i=0;i<lungime-1;i++) if(vector[i]>vector[i+1])
        {
            aux=vector[i];
            vector[i]=vector[i+1];
            vector[i+1]=aux;
            OK=0;
            compara.push(i);
            compara.push(i+1);
            let j= i+1;
        }
    }while(OK!==1);

    let bar = document.getElementsByClassName("bars");
    for(let i=0;i<compara.length-1;i+=2)
    {
        setTimeout(() => {
            let x = compara[i];
            let y = compara[i+1];
            let h1=bar[x].style.height
            let h2=bar[y].style.height;
            bar[x].style.height=h2;
            bar[y].style.height=h1;
        },i*5);
    }
 
}

window.onload = function()
{
    reset();
}

export default Element;
