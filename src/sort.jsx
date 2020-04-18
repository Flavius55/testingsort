
import React from 'react';
import './sort.css';


let vector = [];
let compara = [];
let maxim=100;
let onSort=0;

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
    r=randomInteger(5,lungime-5);
    vector[r] = maxim-1;
    r=randomInteger(5,lungime-5);
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
                        style={{height: `${Math.floor(value*65/100)}vh`}} 
                        key={index}></div>
                ))
                }
                </div>
                <div className="buttons">
                    <button className="button_black" onClick={()=>reset()}>Reset</button>
                    <button className="button_black" onClick={()=>BubbleSort()}>BubbleSort</button>
                    <button className="button_black" onClick={()=>MergeSort()}>MergeSort</button>
                    <button className="button_black" onClick={()=>QuickSort()}>QuickSort</button>
                </div>
            </div>
        );
    }
}

function reset()
{
    if(onSort===0)
    {
        generateNewArray();
        vector.map((value,index) =>
        {
            let bar = document.getElementsByClassName("bars");
            bar[index].style.height = `${Math.floor(value*65/100)}vh`;
            bar[index].style.backgroundColor="black";
            return 0;
        })
    }
}

function BubbleSort()
{
    if(onSort === 0)
    {
        onSort=1;
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
            let x = compara[i];
            let y = compara[i+1];

                setTimeout(() => {
                let h1=bar[x].style.height
                let h2=bar[y].style.height;
                bar[x].style.height=h2;
                bar[y].style.height=h1;
                bar[x].style.backgroundColor="#6200EE";
                bar[y].style.backgroundColor="#6200EE";
                },i*5);
                setTimeout(() => {
                bar[x].style.backgroundColor="black";
                bar[y].style.backgroundColor="black";
                },(i+1)*5);
        }
        setTimeout(() =>
        {
            for(let i=0;i<vector.length;i++)
            bar[i].style.backgroundColor="#6200EE";
            onSort=0;
        },(compara.length)*5);
    }
}

/*function afis()
{
    for(let i=0;i<vector.length;i++)
    {
        let bar=document.getElementsByClassName("bars");
        bar[i].style.height=`${Math.floor(vector[i]*65/100)}vh`;
        console.log(vector[i]);
    }
}*/

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
    if(onSort===0)
    {
        onSort=1;
        compara = [];
        MergeSortMic(vector,secundar,0,vector.length-1);

        let bar = document.getElementsByClassName("bars");
        for(let i=0;i<compara.length-1;i+=2)
        {
            let h = compara[i];
            let g = compara[i+1];
            setTimeout(() => {
                let x =`${Math.floor(g*65/100)}vh`;
                bar[h].style.height = x;
                bar[h].style.backgroundColor = "#6200EE";
            },i*7);
            setTimeout(() => {
                bar[h].style.backgroundColor = "black";
            },(i+5)*7);
        }
        setTimeout(() =>
        {
            for(let i=0;i<vector.length;i++)
            bar[i].style.backgroundColor="#6200EE";
            onSort=0;
        },(compara.length+5)*7);
    }
}

function quick(array,s,d)
{
    let i=s;
    let j=d;
    let pi=0,pj=1;

    while(i<j)
    {
        if(array[i]>array[j])
        {
            let aux=array[i];
            array[i]=array[j];
            array[j]=aux;
            aux=pi;
            pi=pj;
            pj=aux;
            compara.push(i);
            compara.push(j);
        }
        i+=pi;
        j-=pj;
    }
    return i;
}

function QuickSortMic(array,s,d)
{
    if(s<d)
    {
        let m = quick(array,s,d);
        QuickSortMic(array,s,m);
        QuickSortMic(array,m+1,d);
    }
}

function QuickSort()
{
    if(onSort===0)
    {
        onSort=1;
        compara = [];
        QuickSortMic(vector,0,vector.length-1);

        let bar = document.getElementsByClassName("bars");
        for(let i=0;i<compara.length-1;i+=2)
        {
            let x = compara[i];
            let y = compara[i+1];

                setTimeout(() => {
                let h1=bar[x].style.height
                let h2=bar[y].style.height;
                bar[x].style.height=h2;
                bar[y].style.height=h1;
                bar[x].style.backgroundColor="#6200EE";
                bar[y].style.backgroundColor="#6200EE";
                },i*25);
                setTimeout(() => {
                    bar[x].style.backgroundColor="black";
                    bar[y].style.backgroundColor="black";
                    },(i+1)*25);
        }
        setTimeout(() =>
        {
            for(let i=0;i<vector.length;i++)
            bar[i].style.backgroundColor="#6200EE";
            onSort=0;
        },(compara.length)*25);
    }
}

export default Element;
