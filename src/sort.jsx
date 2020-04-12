import React from 'react';
import './sort.css';

let vector = [];
let compara = [];
let lungime=50;
let maxim=100;

function generateNewArray()
{
    for(let i=0;i<lungime;i++)
    {
        vector[i] = randomInteger(5, maxim);
    }
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
        for(let i=0;i<lungime;i++) console.log(vector[i]);
        return(
            <div className="grafic">
                {
                vector.map((value,index) =>
                ( <div className="bars" style={{height: `${value}px`}} key={index}></div>
                ))
                }
            </div>
        );
    }
}

export default Element;
