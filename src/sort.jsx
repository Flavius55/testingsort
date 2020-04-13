
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
                <button className="buttN" onClick={(e) => reset()}>reset</button>
                <button className="buttoN" onClick={(e) => BubbleSort()}>bubble</button>
                <button className="bmerge" 
                onClick={(e) => MergeSort()}>merge</button>
                <button className="afis" onClick={(e) => afis()}>afis</button>
            </div>
        );
    }
}

function reset()
{
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

function afis()
{
    for(let i=0;i<vector.length;i++)
    {
        let bar=document.getElementsByClassName("bars");
        bar[i].style.height=Math.floor(vector[i]*((wheight)*65/100)/100)+'px';
        //console.log(vector[i]);
    }
}

window.onload = function()
{
    reset();
}

let secundar = [];

function merge(array,b,s,d,m)
{
    let i=s;
    let j=m+1;
    let k=s;

    while(i<=m && j<=d)
    {
        if(array[i]<=array[j]) 
        {
            b[k++]=array[i++];
            compara.push(k-1,b[k-1]);
        }
        else 
        {
            b[k++]=array[j++];
            compara.push(k-1,b[k-1]);
        }
    }
    while(i<=m) 
    {
        b[k++]=array[i++];
        compara.push(k-1,b[k-1]);
    }
    while(j<=d) 
    {
        b[k++]=array[j++];
        compara.push(k-1,b[k-1]);
    }
    for(i=s;i<=d;i++) array[i]=b[i];
}

function MergeSortMic(array,b,s,d)
{
    if((d-s)<=1) 
    {
        if(array[s]>array[d]) 
        {
            let aux=array[s];
            array[s]=array[d];
            array[d]=aux;
        }
    }
    else
    {
        let m = Math.floor((s+d)/2);
        MergeSortMic(array,b,s,m);
        MergeSortMic(array,b,m+1,d);
        merge(array,b,s,d,m);
    }
}

function MergeSort()
{
    compara = [];
    MergeSortMic(vector,secundar,0,vector.length-1);

    let bar = document.getElementsByClassName("bars");
    for(let i=0;i<compara.length-1;i+=2)
    {
        setTimeout(() => {
            let x = Math.floor(compara[i+1]*((wheight)*65/100)/100);
            bar[compara[i]].style.height = x+'px';
        },i*7);
    }
}

export default Element;
